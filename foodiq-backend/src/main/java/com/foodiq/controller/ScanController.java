package com.foodiq.controller;
import com.foodiq.dto.ScanRequest;
import com.foodiq.dto.ScanResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;

@RestController
@RequestMapping("/api/scan")
public class ScanController {

    @PostMapping
    public ResponseEntity<ScanResponse> scanMenu(@RequestBody ScanRequest request) {
        // Mocking Google Cloud Vision OCR for this task
        // Ideally we would call an external API here
        ScanResponse response = new ScanResponse(Arrays.asList("Grilled Chicken", "Caesar Salad", "Pancake"));
        return ResponseEntity.ok(response);
    }
}
