package com.foodiq.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.foodiq.exception.InvalidInputException;

import java.util.Locale;

public enum FoodType {
    @JsonProperty("veg")
    VEG,
    
    @JsonProperty("non-veg")
    NON_VEG;

    @JsonCreator
    public static FoodType fromValue(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        String normalized = value.trim().toLowerCase(Locale.ROOT).replace('_', '-');
        return switch (normalized) {
            case "veg", "vegetarian" -> VEG;
            case "non-veg", "nonveg", "non vegetarian", "non-vegetarian" -> NON_VEG;
            default -> throw new InvalidInputException("Invalid preference value: " + value);
        };
    }
}
