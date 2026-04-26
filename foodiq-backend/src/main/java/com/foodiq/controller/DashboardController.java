package com.foodiq.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    public ResponseEntity<?> getDashboard() {
        // Mock dashboard data
        Map<String, Object> data = new HashMap<>();
        data.put("dailyIntake", 1500);
        data.put("proteinScore", 75); // 75%
        data.put("weeklyProgress", Arrays.asList(2000, 1800, 1500, 2100, 1900, 2200, 1600));
        return ResponseEntity.ok(data);
    }
}
