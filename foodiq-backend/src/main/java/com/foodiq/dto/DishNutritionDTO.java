package com.foodiq.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DishNutritionDTO {
    private String dish;
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    
    // AI Features
    private int healthScore;
    private String healthLabel; // e.g., "Healthy", "Indulgent"
    private String suggestion;  // e.g., "Try grilled instead of fried"
    private double confidence;  // OCR confidence or matching confidence
}
