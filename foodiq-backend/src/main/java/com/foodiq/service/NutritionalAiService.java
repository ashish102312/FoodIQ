package com.foodiq.service;

import com.foodiq.dto.DishNutritionDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NutritionalAiService {

    public void enrichWithAi(DishNutritionDTO dto) {
        int score = calculateHealthScore(dto);
        dto.setHealthScore(score);
        dto.setHealthLabel(getLabel(score));
        dto.setSuggestion(generateSuggestion(dto));
        dto.setConfidence(0.92); // Mock confidence for now
    }

    private int calculateHealthScore(DishNutritionDTO dto) {
        // Simple heuristic: 100 base
        // -1 for every 10 calories
        // +2 for every 1g protein
        // -1.5 for every 1g fat
        // +10 bonus for low carb (<30g)
        double score = 100.0 
                - (dto.getCalories() / 10.0) 
                + (dto.getProtein() * 2.0) 
                - (dto.getFat() * 1.5)
                + (dto.getCarbs() < 30.0 ? 10.0 : 0.0);
        
        return (int) Math.min(100, Math.max(0, Math.round(score)));
    }

    private String getLabel(int score) {
        if (score >= 75) return "Healthy";
        if (score >= 50) return "Moderate";
        return "Indulgent";
    }

    private String generateSuggestion(DishNutritionDTO dto) {
        if (dto.getFat() > 25.0) {
            return "Consider a grilled alternative to reduce fat intake.";
        }
        if (dto.getProtein() < 10.0 && dto.getCalories() > 400) {
            return "Add a protein side to make this meal more balanced.";
        }
        if (dto.getHealthScore() > 80) {
            return "Excellent choice! This is a nutrient-dense option.";
        }
        return "Enjoy your meal in moderation.";
    }
}
