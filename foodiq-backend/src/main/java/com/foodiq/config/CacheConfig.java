package com.foodiq.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

/**
 * CacheConfig is temporarily simplified.
 * Redis cache has been removed. Cache type is set to 'none' in application.yml.
 * This class is kept for future re-enablement.
 */
@Configuration
@Slf4j
public class CacheConfig {
    // No cache configuration needed when cache type is 'none'
}
