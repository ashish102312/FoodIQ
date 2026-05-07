package com.foodiq.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

/**
 * Local OCR service using Tesseract 5 via Tess4J.
 * No external API calls — fully offline.
 * Uses ImageProcessingService to preprocess the image before OCR.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OcrService {

    @Value("${tesseract.datapath:/opt/homebrew/opt/tesseract/share/tessdata}")
    private String tessDataPath;

    private final ImageProcessingService imageProcessingService;

    public String extractText(byte[] imageBytes) {
        log.info("Starting local OCR with Tess4J...");
        try {
            // Preprocess image for best results
            BufferedImage processed = imageProcessingService.preprocess(imageBytes);

            // Configure Tesseract
            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath(tessDataPath);
            tesseract.setLanguage("eng");
            // PSM 6: Assume a single uniform block of text (good for menus)
            tesseract.setPageSegMode(6);
            // OEM 1: Use LSTM neural net engine
            tesseract.setOcrEngineMode(1);

            String result = tesseract.doOCR(processed);

            log.info("=== OCR EXTRACTED TEXT ===");
            log.info("\n{}", result);
            log.info("=== END OCR TEXT ===");

            return result != null ? result.trim() : "";

        } catch (TesseractException e) {
            log.error("Tesseract OCR failed: {}", e.getMessage());
            return "";
        } catch (Exception e) {
            log.error("Unexpected OCR error: ", e);
            return "";
        }
    }
}
