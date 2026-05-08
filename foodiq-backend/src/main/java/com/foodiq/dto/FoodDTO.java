package com.foodiq.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDTO {
    private Long id;
    private String name;
    private Integer calories;
    private Double protein;
    private Double carbs;
    private Double fats;
    private Double fiber;
    private Double sodium;
    private String micronutrients;
    private Integer healthScore;
    private String category;
}
