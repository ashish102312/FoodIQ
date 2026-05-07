package com.foodiq.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * RateLimiterFilter is temporarily disabled.
 * Redis dependency has been removed for local development stability.
 * This class is kept for future re-enablement but is NOT registered as a Spring component.
 */
@Slf4j
public class RateLimiterFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Temporarily pass through all requests
        filterChain.doFilter(request, response);
    }
}
