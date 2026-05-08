package com.foodiq.repository;

import com.foodiq.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByMenuIdOrderByProteinDescCaloriesDesc(Long menuId);
    Optional<Food> findByNameIgnoreCase(String name);
    List<Food> findByNameContainingIgnoreCase(String keyword);
    List<Food> findByCategory(String category);
}
