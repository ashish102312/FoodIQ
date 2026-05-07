package com.foodiq.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
@Slf4j
public class MappingLoggerConfig {

    @Bean
    public CommandLineRunner logMappings(ApplicationContext context, @org.springframework.beans.factory.annotation.Qualifier("requestMappingHandlerMapping") RequestMappingHandlerMapping mapping) {
        return args -> {
            log.info("--- REGISTERED ENDPOINTS ---");
            mapping.getHandlerMethods().forEach((key, value) -> {
                log.info("{} -> {}", key, value);
            });
            log.info("----------------------------");
        };
    }
}
