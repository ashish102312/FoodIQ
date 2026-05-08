package com.foodiq.service;

import com.foodiq.model.Food;
import com.foodiq.model.Intake;
import com.foodiq.model.User;
import com.foodiq.repository.FoodRepository;
import com.foodiq.repository.IntakeRepository;
import com.foodiq.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IntakeService {
    private final IntakeRepository intakeRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    @Transactional
    public Intake addToIntake(Long userId, Long foodId, Double quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        Intake intake = Intake.builder()
                .user(user)
                .food(food)
                .quantity(quantity)
                .consumedAt(LocalDateTime.now())
                .build();

        return intakeRepository.save(intake);
    }

    public List<Intake> getUserHistory(Long userId) {
        return intakeRepository.findByUserIdOrderByConsumedAtDesc(userId);
    }

    public List<Intake> getDailyIntake(Long userId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        return intakeRepository.findByUserIdAndConsumedAtBetween(userId, startOfDay, endOfDay);
    }
}
