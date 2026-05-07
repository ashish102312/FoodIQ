package com.foodiq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScanResponse {
    private String rawText;
    private List<DishNutritionDTO> detectedFoods;
}
