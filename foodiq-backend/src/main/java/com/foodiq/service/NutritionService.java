package com.foodiq.service;

import com.foodiq.dto.EdamamNutritionDTO;
import com.foodiq.model.Food;
import com.foodiq.model.FoodType;
import com.foodiq.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NutritionService {

    private final FoodRepository foodRepository;
    private final EdamamService edamamService;

    public List<Food> processOcrResult(String ocrText) {
        if (ocrText == null || ocrText.isEmpty()) {
            return new ArrayList<>();
        }

        log.info("Processing OCR text: {}", ocrText);

        // Clean OCR Text (Remove prices, symbols, etc.)
        String cleanedText = ocrText.replaceAll("[^a-zA-Z\\n ]", "");

        // Split Smartly & Filter
        List<String> lines = Arrays.stream(cleanedText.split("\n"))
                .map(String::trim)
                .filter(line -> line.length() > 3)
                .filter(line -> !line.matches(".*\\d.*")) 
                .distinct()
                .collect(Collectors.toList());
        log.info("Extracted {} lines to process.", lines.size());
        log.debug("Lines: {}", lines);

        List<Food> matchedFoods = new ArrayList<>();

        for (String line : lines) {
            // 1. Try local DB match
            List<Food> matches = foodRepository.findByNameContainingIgnoreCase(line);
            
            if (!matches.isEmpty()) {
                matchedFoods.add(matches.get(0));
                log.info("Found match in DB for: {}", line);
            } else {
                // 2. Fallback to Edamam API
                log.info("No DB match for {}. Calling Edamam API...", line);
                Optional<EdamamNutritionDTO> edamamData = edamamService.getNutrition(line);
                
                edamamData.ifPresent(dto -> {
                    Food food = Food.builder()
                            .name(line)
                            .calories(dto.getCalories())
                            .protein(dto.getProtein())
                            .carbs(dto.getCarbs())
                            .fat(dto.getFat())
                            .type(FoodType.VEG) // Default to VEG or analyze ingredients
                            .build();
                    matchedFoods.add(food);
                    log.info("Found Edamam data for: {}", line);
                });
                if (edamamData.isEmpty()) {
                    log.warn("Edamam returned no data for: {}", line);
                }
            }
        }

        return matchedFoods;
    }
}
