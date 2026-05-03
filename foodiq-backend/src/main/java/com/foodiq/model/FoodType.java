package com.foodiq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum FoodType {
    @JsonProperty("veg")
    VEG,
    
    @JsonProperty("non-veg")
    NON_VEG
}
