package com.foodiq.dto;
import java.util.List;
public class ScanResponse {
    private List<String> detectedFoods;
    public ScanResponse(List<String> detectedFoods) { this.detectedFoods = detectedFoods; }
    public List<String> getDetectedFoods() { return detectedFoods; }
}
