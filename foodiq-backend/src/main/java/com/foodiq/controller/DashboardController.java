package com.foodiq.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
import org.springframework.cache.annotation.Cacheable;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    @Cacheable(value = "dashboard", key = "#userId")
    public ResponseEntity<?> getDashboard(@RequestParam Long userId) {
        // Mock dashboard data
        Map<String, Object> data = new HashMap<>();
        data.put("dailyIntake", 1500);
        data.put("proteinScore", 75); // 75%
        data.put("weeklyProgress", Arrays.asList(2000, 1800, 1500, 2100, 1900, 2200, 1600));
        return ResponseEntity.ok(data);
    }
}
