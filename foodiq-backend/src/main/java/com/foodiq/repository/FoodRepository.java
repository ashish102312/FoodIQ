package com.foodiq.repository;

import com.foodiq.model.Food;
import com.foodiq.model.FoodType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {

    Optional<Food> findByNameIgnoreCase(String name);

    List<Food> findByType(FoodType type);

    List<Food> findByNameContainingIgnoreCase(String keyword);
}
