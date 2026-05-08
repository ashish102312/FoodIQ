package com.foodiq.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScanResponse {
    private String menuName;
    private Double totalProtein;
    private Integer totalCalories;
    private List<FoodDTO> foods;
}
