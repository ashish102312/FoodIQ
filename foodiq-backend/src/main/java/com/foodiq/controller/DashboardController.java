package com.foodiq.controller;

import com.foodiq.model.Intake;
import com.foodiq.model.User;
import com.foodiq.service.IntakeService;
import com.foodiq.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {
    private final IntakeService intakeService;
    private final UserService userService;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);

        List<Intake> dailyIntakes = intakeService.getDailyIntake(user.getId(), LocalDate.now());
        
        double dailyProtein = dailyIntakes.stream().mapToDouble(i -> i.getFood().getProtein() * i.getQuantity()).sum();
        int dailyCalories = (int) dailyIntakes.stream().mapToDouble(i -> i.getFood().getCalories() * i.getQuantity()).sum();
        double avgHealthScore = dailyIntakes.stream().mapToInt(i -> i.getFood().getHealthScore()).average().orElse(0.0);

        Map<String, Object> stats = new HashMap<>();
        stats.put("dailyIntake", dailyCalories);
        stats.put("dailyProtein", dailyProtein);
        
        double proteinGoal = user.getGoalProtein() != null ? user.getGoalProtein() : 100.0;
        stats.put("proteinScore", (int)((dailyProtein / proteinGoal) * 100));
        stats.put("healthScoreAverage", avgHealthScore);
        
        // Add weekly progress (calories) for graph
        List<Integer> weeklyProgress = new java.util.ArrayList<>();
        for(int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            int calories = (int) intakeService.getDailyIntake(user.getId(), date).stream()
                    .mapToDouble(in -> in.getFood().getCalories() * in.getQuantity()).sum();
            weeklyProgress.add(calories);
        }
        stats.put("weeklyProgress", weeklyProgress);
        stats.put("recentFoods", dailyIntakes.stream().map(i -> i.getFood().getName()).limit(5).collect(Collectors.toList()));

        return ResponseEntity.ok(stats);
    }
}
