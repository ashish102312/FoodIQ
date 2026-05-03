package com.foodiq.dto;

import com.foodiq.model.FoodType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class FoodDTO {

    @NotBlank(message = "Food name is required")
    private String name;

    @NotNull(message = "Protein value is required")
    private Double protein;

    private Double carbs;

    private Double calories;

    @NotNull(message = "Food type is required")
    private FoodType type;

    private List<String> ingredients;
}
