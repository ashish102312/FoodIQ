package com.foodiq.controller;

import com.foodiq.dto.FoodDTO;
import com.foodiq.dto.ScanResponse;
import com.foodiq.model.Food;
import com.foodiq.model.Menu;
import com.foodiq.repository.FoodRepository;
import com.foodiq.service.ImagePreprocessingService;
import com.foodiq.service.MenuService;
import com.foodiq.service.OcrService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/scan")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ScanController {
    private static final Logger logger = LoggerFactory.getLogger(ScanController.class);

    private final ImagePreprocessingService preprocessingService;
    private final OcrService ocrService;
    private final MenuService menuService;
    private final FoodRepository foodRepository;

    @PostMapping
    public ResponseEntity<ScanResponse> scanMenu(@RequestParam("image") MultipartFile image) {
        try {
            if (image.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // 1. Preprocess
            BufferedImage preprocessed = preprocessingService.preprocess(image);

            // 2. OCR
            String extractedText = ocrService.extractText(preprocessed);

            // 3. Detect Menu
            Optional<Menu> detectedMenu = menuService.detectMenu(extractedText);

            if (detectedMenu.isEmpty()) {
                return ResponseEntity.ok(ScanResponse.builder()
                        .menuName("Unknown Menu")
                        .foods(List.of())
                        .totalProtein(0.0)
                        .totalCalories(0)
                        .build());
            }

            // 4. Load foods from DB
            List<Food> foods = foodRepository.findByMenuIdOrderByProteinDescCaloriesDesc(detectedMenu.get().getId());

            // 5. Build Response
            List<FoodDTO> foodDTOs = foods.stream()
                    .map(this::mapToDTO)
                    .collect(Collectors.toList());

            double totalProtein = foodDTOs.stream().mapToDouble(FoodDTO::getProtein).sum();
            int totalCalories = foodDTOs.stream().mapToInt(FoodDTO::getCalories).sum();

            ScanResponse response = ScanResponse.builder()
                    .menuName(detectedMenu.get().getName())
                    .foods(foodDTOs)
                    .totalProtein(totalProtein)
                    .totalCalories(totalCalories)
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Scan failed with error type: {}", e.getClass().getName());
            logger.error("Error message: {}", e.getMessage());
            logger.error("Stack trace: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private FoodDTO mapToDTO(Food food) {
        return FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .calories(food.getCalories())
                .protein(food.getProtein())
                .carbs(food.getCarbs())
                .fats(food.getFats())
                .fiber(food.getFiber())
                .sodium(food.getSodium())
                .micronutrients(food.getMicronutrients())
                .healthScore(food.getHealthScore())
                .category(food.getCategory())
                .build();
    }
}
