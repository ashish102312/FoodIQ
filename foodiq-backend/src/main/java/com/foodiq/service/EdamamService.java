package com.foodiq.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * EdamamService is temporarily disabled.
 * External Edamam API dependency has been removed for local development stability.
 * All nutrition lookups now use the local PostgreSQL foods table.
 * This class is kept as a stub for future re-enablement.
 */
@Service
@Slf4j
public class EdamamService {

    /**
     * Stub method - always returns empty.
     * Nutrition data is now sourced from the local DB.
     */
    public Optional<Object> getNutrition(String foodName) {
        log.debug("EdamamService is disabled. Skipping lookup for: {}", foodName);
        return Optional.empty();
    }
}
