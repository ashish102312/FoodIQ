package com.foodiq.service;

import com.foodiq.dto.FoodDTO;
import com.foodiq.exception.ResourceNotFoundException;
import com.foodiq.model.Food;
import com.foodiq.model.FoodType;
import com.foodiq.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    /**
     * Save a new food item.
     */
    public Food saveFood(FoodDTO dto) {
        Food food = Food.builder()
                .name(dto.getName())
                .protein(dto.getProtein())
                .carbs(dto.getCarbs())
                .calories(dto.getCalories())
                .type(dto.getType())
                .ingredients(dto.getIngredients())
                .build();
        return foodRepository.save(food);
    }

    /**
     * Get food by exact name (case-insensitive).
     */
    @Cacheable(value = "food", key = "#name")
    public Food getFoodByName(String name) {
        return foodRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with name: " + name));
    }

    /**
     * Get food by ID.
     */
    @Cacheable(value = "foodById", key = "#id")
    public Food getFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food", id));
    }

    /**
     * Get all foods, optionally filtered by type (VEG / NON_VEG).
     */
    @Cacheable(value = "allFoods", key = "#type != null ? #type.name() : 'ALL'")
    public List<Food> getAllFoods(FoodType type) {
        if (type != null) {
            return foodRepository.findByType(type);
        }
        return foodRepository.findAll();
    }

    /**
     * Search food by keyword in name.
     */
    public List<Food> searchFoods(String keyword) {
        return foodRepository.findByNameContainingIgnoreCase(keyword);
    }
}
