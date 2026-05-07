package com.foodiq.controller;

import com.foodiq.dto.DishNutritionDTO;
import com.foodiq.dto.ScanResponse;
import com.foodiq.model.Food;
import com.foodiq.model.User;
import com.foodiq.service.NutritionService;
import com.foodiq.service.OcrService;
import com.foodiq.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class ScanController {

    private final OcrService ocrService;
    private final NutritionService nutritionService;
    private final UserService userService;
    private final com.foodiq.repository.ScanHistoryRepository scanHistoryRepository;
    private final com.foodiq.service.NutritionalAiService nutritionalAiService;

    @PostConstruct
    public void init() {
        log.info("ScanController ready → POST /api/scan [local Tesseract OCR]");
    }

    @GetMapping("/scan/test")
    public Map<String, Object> test() {
        return Map.of("status", "ok", "engine", "Local Tesseract 5", "message", "FoodIQ Scanner is ready");
    }

    @PostMapping(value = "/scan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> scan(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) Long userId) {

        long startTime = System.currentTimeMillis();
        log.info("Scan request: file='{}' size={}bytes userId={}", 
                file.getOriginalFilename(), file.getSize(), userId);

        // Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(errorResponse("No file provided"));
        }
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body(errorResponse("Only image files are supported"));
        }
        if (file.getSize() > 15 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(errorResponse("File exceeds 15MB limit"));
        }

        try {
            byte[] imageBytes = file.getBytes();

            // 1. OCR with 12-second timeout
            ExecutorService executor = Executors.newSingleThreadExecutor();
            Future<String> ocrFuture = executor.submit(() -> ocrService.extractText(imageBytes));
            String rawText;
            try {
                rawText = ocrFuture.get(12, TimeUnit.SECONDS);
            } catch (TimeoutException e) {
                ocrFuture.cancel(true);
                log.warn("OCR timed out — proceeding with empty text");
                rawText = "";
            } finally {
                executor.shutdownNow();
            }

            // 2. Find foods from OCR text
            List<Food> detectedFoods = nutritionService.processOcrResult(rawText);

            // 3. Filter by user preference
            if (userId != null) {
                try {
                    User user = userService.getUserById(userId);
                    if (user != null && user.getPreference() == com.foodiq.model.FoodType.VEG) {
                        detectedFoods = detectedFoods.stream()
                                .filter(f -> f.getType() == com.foodiq.model.FoodType.VEG)
                                .collect(Collectors.toList());
                    }
                } catch (Exception e) {
                    log.warn("Could not apply user preferences: {}", e.getMessage());
                }
            }

            // 4. Map to DTO and compute health scores
            List<DishNutritionDTO> foods = detectedFoods.stream()
                    .map(food -> {
                        DishNutritionDTO dto = DishNutritionDTO.builder()
                                .dish(food.getName() != null ? food.getName() : "Unknown")
                                .calories(food.getCalories() != null ? food.getCalories() : 0.0)
                                .protein(food.getProtein() != null ? food.getProtein() : 0.0)
                                .carbs(food.getCarbs() != null ? food.getCarbs() : 0.0)
                                .fat(food.getFat() != null ? food.getFat() : 0.0)
                                .build();
                        nutritionalAiService.enrichWithAi(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());

            long scanTime = System.currentTimeMillis() - startTime;
            log.info("Scan complete: {} foods found in {}ms", foods.size(), scanTime);

            // 5. Save Scan History
            try {
                com.foodiq.model.ScanHistory history = com.foodiq.model.ScanHistory.builder()
                        .rawText(rawText)
                        .scanTimeMs(scanTime)
                        .foodCount(foods.size())
                        .user(userId != null ? userService.getUserById(userId) : null)
                        .build();
                scanHistoryRepository.save(history);
            } catch (Exception e) {
                log.warn("Failed to save scan history: {}", e.getMessage());
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("success", true);
            response.put("rawText", rawText);
            response.put("foods", foods);
            response.put("scanTime", scanTime);
            response.put("count", foods.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Scan failed: ", e);
            return ResponseEntity.internalServerError().body(errorResponse("Scan failed: " + e.getMessage()));
        }
    }

    private Map<String, Object> errorResponse(String message) {
        return Map.of(
                "success", false,
                "error", message,
                "rawText", "",
                "foods", List.of(),
                "scanTime", 0
        );
    }
}
