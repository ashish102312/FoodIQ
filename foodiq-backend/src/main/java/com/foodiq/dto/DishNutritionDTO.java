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
}
