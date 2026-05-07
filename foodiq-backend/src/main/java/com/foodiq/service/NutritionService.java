package com.foodiq.service;

import com.foodiq.model.Food;
import com.foodiq.model.FoodType;
import com.foodiq.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Processes OCR text to find matching food items.
 * Pipeline:
 *  1. Tokenize OCR text into candidate food phrases
 *  2. Search local PostgreSQL DB (exact + partial match)
 *  3. Fallback: OpenFoodFacts API lookup
 *  4. Fallback: mock sample foods if nothing found
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NutritionService {

    private final FoodRepository foodRepository;
    private final OpenFoodFactsService openFoodFactsService;

    // Common menu stop-words to ignore during tokenization
    private static final Set<String> STOP_WORDS = Set.of(
        "and", "with", "the", "for", "from", "our", "your", "fresh", "special",
        "daily", "today", "soup", "sauce", "dressing", "style", "house", "chef",
        "please", "note", "price", "includes", "served", "side", "choice"
    );

    public List<Food> processOcrResult(String ocrText) {
        if (ocrText == null || ocrText.trim().isEmpty()) {
            log.warn("Empty OCR text — returning mock fallback foods");
            return getMockFallbackFoods();
        }

        log.info("Processing OCR text ({} chars)...", ocrText.length());

        // 1. Extract candidate food phrases from OCR text
        List<String> candidates = extractCandidates(ocrText);
        log.info("Extracted {} food candidates from OCR text", candidates.size());
        log.debug("Candidates: {}", candidates);

        List<Food> matched = new ArrayList<>();
        Set<Long> seenIds = new HashSet<>();
        Set<String> seenNames = new HashSet<>();

        for (String candidate : candidates) {
            // 2. Try local DB — exact/partial match
            List<Food> dbResults = foodRepository.findByNameContainingIgnoreCase(candidate);
            if (!dbResults.isEmpty()) {
                for (Food f : dbResults) {
                    if (f.getId() != null && seenIds.add(f.getId())) {
                        matched.add(f);
                        log.info("Local DB match: '{}' → '{}'", candidate, f.getName());
                    }
                }
                continue;
            }

            // 3. Fallback: OpenFoodFacts
            if (candidate.length() >= 4) {
                Optional<Food> off = openFoodFactsService.searchFood(candidate);
                off.ifPresent(food -> {
                    if (seenNames.add(food.getName().toLowerCase())) {
                        matched.add(food);
                        log.info("OpenFoodFacts match: '{}' → '{}'", candidate, food.getName());
                    }
                });
            }
        }

        // 4. Mock fallback if nothing found
        if (matched.isEmpty()) {
            log.warn("No matches found for OCR text — returning mock fallback foods");
            return getMockFallbackFoods();
        }

        // Limit to 12 items for clean UI
        return matched.stream().limit(12).collect(Collectors.toList());
    }

    private List<String> extractCandidates(String ocrText) {
        // Clean: remove prices, symbols, numbers
        String cleaned = ocrText
                .replaceAll("(?i)(rs\\.?|INR|₹|\\$|price)\\s*\\d*\\.?\\d+", "") // prices with symbols
                .replaceAll("\\d+\\.?\\d*", "")                                 // standalone numbers
                .replaceAll("[^a-zA-Z\\n\\s]", " ")                             // non-alpha
                .replaceAll("\\s{2,}", " ");                                    // collapse spaces

        Set<String> candidates = new LinkedHashSet<>();

        // Add full lines and merged lines as candidates
        String[] lines = cleaned.split("\\n");
        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.length() >= 4 && line.length() <= 50 && !isStopWord(line)) {
                candidates.add(line);
                
                // Try merging with next line if it's short (likely a continuation)
                if (i + 1 < lines.length) {
                    String next = lines[i+1].trim();
                    if (next.length() > 2 && next.length() < 20 && !isStopWord(next)) {
                        candidates.add(line + " " + next);
                    }
                }
            }
        }

        // Add individual words as additional candidates
        Arrays.stream(cleaned.split("[\\s\\n]+"))
                .map(w -> w.trim().toLowerCase())
                .filter(w -> w.length() >= 4)
                .filter(w -> !STOP_WORDS.contains(w))
                .forEach(candidates::add);

        return new ArrayList<>(candidates);
    }

    private boolean isStopWord(String line) {
        String lower = line.toLowerCase().trim();
        return STOP_WORDS.contains(lower) || lower.matches("\\d+") || lower.length() < 4;
    }

    private List<Food> getMockFallbackFoods() {
        return List.of(
            Food.builder().id(0L).name("Grilled Chicken")
                .calories(250.0).protein(30.0).carbs(0.0).fat(12.0).type(FoodType.NON_VEG).build(),
            Food.builder().id(0L).name("Paneer Tikka")
                .calories(320.0).protein(18.0).carbs(10.0).fat(22.0).type(FoodType.VEG).build(),
            Food.builder().id(0L).name("Vegetable Biryani")
                .calories(380.0).protein(8.0).carbs(65.0).fat(10.0).type(FoodType.VEG).build()
        );
    }
}
