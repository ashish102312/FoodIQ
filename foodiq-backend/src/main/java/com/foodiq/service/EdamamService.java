package com.foodiq.service;

import com.foodiq.dto.EdamamNutritionDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EdamamService {

    @Value("${edamam.app-id}")
    private String appId;

    @Value("${edamam.app-key}")
    private String appKey;

    private final RestTemplate restTemplate = createRestTemplate();

    private RestTemplate createRestTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5000); // 5 seconds
        factory.setReadTimeout(5000);    // 5 seconds
        return new RestTemplate(factory);
    }

    /**
     * Fetch nutrition data from Edamam API.
     * Cached to avoid repeated expensive API calls.
     */
    @Cacheable(value = "edamamNutrition", key = "#foodName")
    public Optional<EdamamNutritionDTO> getNutrition(String foodName) {
        log.info("Fetching nutrition data from Edamam for: {}", foodName);

        String url = "https://api.edamam.com/api/nutrition-data";

        try {
            String uri = UriComponentsBuilder.fromHttpUrl(url)
                    .queryParam("app_id", appId)
                    .queryParam("app_key", appKey)
                    .queryParam("ingr", "1 " + foodName)
                    .toUriString();

            EdamamNutritionDTO response = restTemplate.getForObject(uri, EdamamNutritionDTO.class);

            if (response != null) {
                log.info("Edamam returned data for {}: {} kcal", foodName, response.getCalories());
                return Optional.of(response);
            }
        } catch (Exception e) {
            log.error("Error fetching data from Edamam for {}: {}", foodName, e.getMessage());
        }

        return Optional.empty();
    }
}
