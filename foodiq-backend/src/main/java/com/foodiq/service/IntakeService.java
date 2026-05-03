package com.foodiq.service;

import com.foodiq.dto.IntakeDTO;
import com.foodiq.model.Food;
import com.foodiq.model.Intake;
import com.foodiq.model.User;
import com.foodiq.repository.IntakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntakeService {

    private final IntakeRepository intakeRepository;
    private final UserService userService;
    private final FoodService foodService;

    /**
     * Add a new intake record. Includes allergy check.
     */
    public Intake addIntake(IntakeDTO dto) {
        User user = userService.getUserById(dto.getUserId());
        Food food = foodService.getFoodById(dto.getFoodId());

        // Veg filter logic check
        if (user.getPreference() == com.foodiq.model.FoodType.VEG && food.getType() == com.foodiq.model.FoodType.NON_VEG) {
            throw new IllegalArgumentException("Vegetarian user cannot consume non-vegetarian food.");
        }

        // Allergy check
        if (user.getAllergies() != null && food.getIngredients() != null) {
            boolean hasAllergy = !Collections.disjoint(user.getAllergies(), food.getIngredients());
            if (hasAllergy) {
                throw new IllegalArgumentException("Warning: This food contains ingredients you are allergic to.");
            }
        }

        Intake intake = Intake.builder()
                .user(user)
                .food(food)
                .quantity(dto.getQuantity())
                .build();

        return intakeRepository.save(intake);
    }

    /**
     * Get daily intake for a user on a specific date.
     */
    public List<Intake> getDailyIntakes(Long userId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        return intakeRepository.findDailyIntakes(userId, startOfDay, endOfDay);
    }

    /**
     * Calculate daily protein score for a user.
     * score = (totalConsumedProtein / goalProtein) * 100
     */
    public Map<String, Object> calculateProteinScore(Long userId, LocalDate date) {
        User user = userService.getUserById(userId);
        List<Intake> dailyIntakes = getDailyIntakes(userId, date);

        double totalConsumedProtein = dailyIntakes.stream()
                .mapToDouble(intake -> intake.getFood().getProtein() * intake.getQuantity())
                .sum();

        double goalProtein = user.getGoalProtein() != null ? user.getGoalProtein() : 0.0;
        double score = 0.0;
        
        if (goalProtein > 0) {
            score = (totalConsumedProtein / goalProtein) * 100.0;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("totalConsumedProtein", totalConsumedProtein);
        result.put("goalProtein", goalProtein);
        result.put("score", Math.min(score, 100.0)); // Cap at 100% or allow over 100%? Let's cap at 100 for score, but return raw values too.
        result.put("scoreRaw", score);
        return result;
    }
}
