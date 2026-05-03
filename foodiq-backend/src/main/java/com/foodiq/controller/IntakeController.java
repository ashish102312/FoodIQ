package com.foodiq.controller;

import com.foodiq.dto.IntakeDTO;
import com.foodiq.model.Intake;
import com.foodiq.service.IntakeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/intake")
@RequiredArgsConstructor
public class IntakeController {

    private final IntakeService intakeService;

    @PostMapping
    public ResponseEntity<Intake> addIntake(@Valid @RequestBody IntakeDTO intakeDTO) {
        Intake savedIntake = intakeService.addIntake(intakeDTO);
        return new ResponseEntity<>(savedIntake, HttpStatus.CREATED);
    }

    @GetMapping("/daily")
    public ResponseEntity<List<Intake>> getDailyIntakes(
            @RequestParam Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        LocalDate queryDate = date != null ? date : LocalDate.now();
        List<Intake> intakes = intakeService.getDailyIntakes(userId, queryDate);
        return ResponseEntity.ok(intakes);
    }

    @GetMapping("/score")
    public ResponseEntity<Map<String, Object>> getProteinScore(
            @RequestParam Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        LocalDate queryDate = date != null ? date : LocalDate.now();
        Map<String, Object> scoreData = intakeService.calculateProteinScore(userId, queryDate);
        return ResponseEntity.ok(scoreData);
    }
}
