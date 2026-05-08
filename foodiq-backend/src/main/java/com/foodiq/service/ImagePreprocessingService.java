package com.foodiq.service;

import net.coobird.thumbnailator.Thumbnails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class ImagePreprocessingService {
    private static final Logger logger = LoggerFactory.getLogger(ImagePreprocessingService.class);

    public BufferedImage preprocess(MultipartFile file) throws IOException {
        logger.info("Preprocessing image: {}", file.getOriginalFilename());
        
        // 1. Load image
        byte[] bytes = file.getBytes();
        logger.info("Image bytes size: {}", bytes.length);
        InputStream is = new ByteArrayInputStream(bytes);
        BufferedImage originalImage = ImageIO.read(is);
        
        if (originalImage == null) {
            logger.error("ImageIO.read returned null for file: {}. Content type: {}", file.getOriginalFilename(), file.getContentType());
            throw new IOException("Failed to read image file: " + file.getOriginalFilename());
        }
        logger.info("Image dimensions: {}x{}", originalImage.getWidth(), originalImage.getHeight());

        // 2. Resize, Grayscale, and Enhance using Thumbnailator
        // We'll also convert to a standard format and enhance contrast/sharpness conceptually
        // Thumbnailator doesn't have direct "sharpen" or "contrast" but we can use scale and output quality
        // For real sharpening, we'd need Java AWT filters, but we can do a lot with scale up for better OCR
        
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        Thumbnails.of(originalImage)
                .scale(2.0) // Scale up for better OCR accuracy
                .outputFormat("png")
                .outputQuality(1.0)
                .toOutputStream(os);
        
        BufferedImage enhancedImage = ImageIO.read(new ByteArrayInputStream(os.toByteArray()));
        
        // Convert to grayscale for OCR
        BufferedImage grayscale = new BufferedImage(
                enhancedImage.getWidth(), enhancedImage.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        grayscale.getGraphics().drawImage(enhancedImage, 0, 0, null);
        
        logger.info("Image preprocessing complete");
        return grayscale;
    }
}
