package com.foodiq.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodiq.model.Food;
import com.foodiq.model.FoodType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

/**
 * Service for fetching nutrition data from the free OpenFoodFacts API.
 * Used as a fallback when a food item is not found in the local PostgreSQL database.
 * No API key required.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OpenFoodFactsService {

    @Value("${openfoodfacts.base-url:https://world.openfoodfacts.org}")
    private String baseUrl;

    @Value("${openfoodfacts.timeout-seconds:5}")
    private int timeoutSeconds;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Optional<Food> searchFood(String foodName) {
        log.info("Searching OpenFoodFacts for: {}", foodName);
        try {
            RestTemplate restTemplate = buildRestTemplate();

            String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/cgi/search.pl")
                    .queryParam("search_terms", foodName)
                    .queryParam("search_simple", 1)
                    .queryParam("action", "process")
                    .queryParam("json", 1)
                    .queryParam("page_size", 1)
                    .queryParam("fields", "product_name,nutriments,categories_tags")
                    .toUriString();

            String response = restTemplate.getForObject(url, String.class);
            if (response == null) return Optional.empty();

            JsonNode root = objectMapper.readTree(response);
            JsonNode products = root.path("products");

            if (products.isArray() && products.size() > 0) {
                JsonNode product = products.get(0);
                JsonNode nutriments = product.path("nutriments");

                double calories = nutriments.path("energy-kcal_100g").asDouble(0.0);
                double protein  = nutriments.path("proteins_100g").asDouble(0.0);
                double carbs    = nutriments.path("carbohydrates_100g").asDouble(0.0);
                double fat      = nutriments.path("fat_100g").asDouble(0.0);

                if (calories == 0 && protein == 0) {
                    log.warn("OpenFoodFacts returned zero nutrients for: {}", foodName);
                    return Optional.empty();
                }

                String productName = product.path("product_name").asText(foodName);
                log.info("OpenFoodFacts found '{}' for query '{}'", productName, foodName);

                Food food = Food.builder()
                        .name(capitalize(productName.length() > 60 ? foodName : productName))
                        .calories(calories)
                        .protein(protein)
                        .carbs(carbs)
                        .fat(fat)
                        .type(FoodType.VEG) // Default; no reliable type from OFF
                        .build();

                return Optional.of(food);
            }
        } catch (Exception e) {
            log.warn("OpenFoodFacts lookup failed for '{}': {}", foodName, e.getMessage());
        }
        return Optional.empty();
    }

    private RestTemplate buildRestTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(timeoutSeconds * 1000);
        factory.setReadTimeout(timeoutSeconds * 1000);
        return new RestTemplate(factory);
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}
