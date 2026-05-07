package com.foodiq.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;

@Service
@Slf4j
public class OcrService {

    @Value("${ocr-space.api-key:helloworld}")
    private String apiKey;

    @Value("${ocr-space.url:https://api.ocr.space/parse/image}")
    private String apiUrl;

    /**
     * Extracts text from an image using OCR.Space API.
     * Replaces Google Vision to avoid billing requirements.
     */
    public String extractText(String base64Image) {
        log.info("Calling OCR.Space API for text extraction...");

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("apikey", apiKey);
            map.add("base64Image", "data:image/jpeg;base64," + base64Image);
            map.add("language", "eng");
            map.add("isOverlayRequired", "false");
            map.add("isTable", "false");
            map.add("scale", "true");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                
                // OCR.Space returns ParsedResults as a list
                List<Map<String, Object>> parsedResults = (List<Map<String, Object>>) body.get("ParsedResults");
                
                if (parsedResults != null && !parsedResults.isEmpty()) {
                    String extractedText = (String) parsedResults.get(0).get("ParsedText");
                    log.info("OCR.Space extracted text successfully.");
                    log.debug("Extracted Text: {}", extractedText);
                    return extractedText;
                } else if (body.containsKey("ErrorMessage")) {
                    String error = body.get("ErrorMessage").toString();
                    log.error("OCR.Space Error: {}", error);
                    return "OCR Error: " + error;
                }
            }
        } catch (Exception e) {
            log.error("Error calling OCR.Space API: {}", e.getMessage());
            return "OCR Service Unavailable. Please try again later.";
        }

        return "No text detected by OCR.Space";
    }
}
