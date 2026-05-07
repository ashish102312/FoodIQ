package com.foodiq.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EdamamNutritionDTO {

    private double calories;
    private double totalWeight;

    @JsonProperty("totalNutrients")
    private Map<String, NutrientInfo> totalNutrients;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class NutrientInfo {
        private String label;
        private double quantity;
        private String unit;
    }

    public double getProtein() {
        return getNutrientQuantity("PROCNT");
    }

    public double getCarbs() {
        return getNutrientQuantity("CHOCDF");
    }

    public double getFat() {
        return getNutrientQuantity("FAT");
    }

    private double getNutrientQuantity(String key) {
        if (totalNutrients != null && totalNutrients.containsKey(key)) {
            return totalNutrients.get(key).getQuantity();
        }
        return 0.0;
    }
}
