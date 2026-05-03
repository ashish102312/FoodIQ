package com.foodiq.controller;

import com.foodiq.dto.FoodDTO;
import com.foodiq.model.Food;
import com.foodiq.model.FoodType;
import com.foodiq.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @PostMapping
    public ResponseEntity<Food> createFood(@Valid @RequestBody FoodDTO foodDTO) {
        Food savedFood = foodService.saveFood(foodDTO);
        return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Food> getFoodByName(@PathVariable String name) {
        Food food = foodService.getFoodByName(name);
        return ResponseEntity.ok(food);
    }

    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods(@RequestParam(required = false) FoodType type) {
        List<Food> foods = foodService.getAllFoods(type);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFoods(@RequestParam String keyword) {
        List<Food> foods = foodService.searchFoods(keyword);
        return ResponseEntity.ok(foods);
    }
}
