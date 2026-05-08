package com.foodiq.controller;

import com.foodiq.model.Intake;
import com.foodiq.model.User;
import com.foodiq.service.IntakeService;
import com.foodiq.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/intake")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class IntakeController {
    private final IntakeService intakeService;
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addToIntake(@RequestParam Long foodId, @RequestParam(defaultValue = "1.0") Double quantity) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        
        Intake intake = intakeService.addToIntake(user.getId(), foodId, quantity);
        return ResponseEntity.ok(intake);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Intake>> getHistory() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        
        List<Intake> history = intakeService.getUserHistory(user.getId());
        return ResponseEntity.ok(history);
    }
}
