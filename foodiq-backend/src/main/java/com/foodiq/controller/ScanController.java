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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ScanController {

    private final OcrService ocrService;
    private final NutritionService nutritionService;
    private final UserService userService;

    @PostConstruct
    public void init() {
        log.info("ScanController loaded successfully at /api/scan");
    }

    @GetMapping("/scan/test")
    public String test() {
        return "Scan API working";
    }

    @PostMapping(value = "/scan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ScanResponse scan(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) Long userId) throws Exception {
        
        log.info("Received scan request for file: {} and userId: {}", file.getOriginalFilename(), userId);

        try {
            // 1. Extract text using OCR
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            String extractedText = ocrService.extractText(base64);
            log.debug("OCR extracted text: {}", extractedText);

            // 2. Process text to find nutrition data (DB + Edamam Fallback)
            List<Food> detectedFoods = nutritionService.processOcrResult(extractedText);

            // 3. Apply Filters if userId is provided
            if (userId != null) {
                User user = userService.getUserById(userId);
                if (user.getPreference() == com.foodiq.model.FoodType.VEG) {
                    detectedFoods = detectedFoods.stream()
                            .filter(food -> food.getType() == com.foodiq.model.FoodType.VEG)
                            .collect(Collectors.toList());
                }
            }

            // 4. Map to DishNutritionDTO for the required JSON format
            List<DishNutritionDTO> finalFoods = detectedFoods.stream()
                    .map(food -> DishNutritionDTO.builder()
                            .dish(food.getName())
                            .calories(food.getCalories() != null ? food.getCalories() : 0.0)
                            .protein(food.getProtein() != null ? food.getProtein() : 0.0)
                            .carbs(food.getCarbs() != null ? food.getCarbs() : 0.0)
                            .fat(food.getFat() != null ? food.getFat() : 0.0)
                            .build())
                    .collect(Collectors.toList());

            log.info("Scan completed successfully. Found {} foods.", finalFoods.size());
            return new ScanResponse(extractedText, finalFoods);

        } catch (Exception e) {
            log.error("Error during scan process: ", e);
            throw e;
        }
    }
}
