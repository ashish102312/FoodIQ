package com.foodiq.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.io.File;

@Service
public class OcrService {
    private static final Logger logger = LoggerFactory.getLogger(OcrService.class);

    @Value("${tesseract.datapath}")
    private String tessDataPath;

    public String extractText(BufferedImage image) {
        Tesseract tesseract = new Tesseract();
        
        // Ensure the path is correct
        File tessDataFolder = new File(tessDataPath);
        if (!tessDataFolder.exists()) {
            logger.error("Tesseract data path does not exist: {}", tessDataPath);
            // Fallback or handle error
        }
        
        tesseract.setDatapath(tessDataPath);
        tesseract.setLanguage("eng");
        tesseract.setPageSegMode(1); // Automatic page segmentation with OSD

        try {
            logger.info("Extracting text from image using Tesseract...");
            String result = tesseract.doOCR(image);
            logger.info("OCR Result length: {}", result != null ? result.length() : 0);
            return result;
        } catch (UnsatisfiedLinkError e) {
            logger.error("Tesseract native library not found. Please ensure 'tesseract' is installed (brew install tesseract). Details: {}", e.getMessage());
            return "ERROR: Tesseract library not found";
        } catch (TesseractException e) {
            logger.error("OCR failed: {}", e.getMessage());
            return "";
        } catch (Exception e) {
            logger.error("Unexpected error during OCR: ", e);
            return "";
        }
    }
}
