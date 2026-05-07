package com.foodiq.service;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
import java.awt.image.RescaleOp;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Service for preprocessing food menu images before OCR.
 * Applies grayscale, resize, sharpen, and contrast enhancement
 * to significantly improve Tesseract accuracy on menu images.
 */
@Service
@Slf4j
public class ImageProcessingService {

    public BufferedImage preprocess(byte[] imageBytes) throws IOException {
        log.info("Starting image preprocessing pipeline...");

        BufferedImage original = ImageIO.read(new ByteArrayInputStream(imageBytes));
        if (original == null) {
            throw new IOException("Cannot read image from uploaded bytes");
        }

        log.info("Original image size: {}x{}", original.getWidth(), original.getHeight());

        // Step 1: Upscale using Thumbnailator (bicubic, high quality)
        BufferedImage resized = upscale(original);

        // Step 2: Convert to grayscale
        BufferedImage gray = toGrayscale(resized);

        // Step 3: Enhance contrast
        BufferedImage contrasted = enhanceContrast(gray);

        // Step 4: Sharpen
        BufferedImage sharpened = sharpen(contrasted);

        log.info("Image preprocessing complete. Output size: {}x{}", sharpened.getWidth(), sharpened.getHeight());
        return sharpened;
    }

    private BufferedImage upscale(BufferedImage source) throws IOException {
        int targetWidth = Math.max(source.getWidth() * 2, 1600);
        int targetHeight = (int) ((double) source.getHeight() / source.getWidth() * targetWidth);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(source, "png", baos);
        InputStream is = new ByteArrayInputStream(baos.toByteArray());

        BufferedImage resized = Thumbnails.of(is)
                .size(targetWidth, targetHeight)
                .keepAspectRatio(true)
                .outputQuality(1.0)
                .asBufferedImage();

        log.debug("Upscaled from {}x{} to {}x{}", source.getWidth(), source.getHeight(),
                resized.getWidth(), resized.getHeight());
        return resized;
    }

    private BufferedImage toGrayscale(BufferedImage source) {
        BufferedImage gray = new BufferedImage(
                source.getWidth(), source.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g = gray.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.drawImage(source, 0, 0, null);
        g.dispose();
        return gray;
    }

    private BufferedImage enhanceContrast(BufferedImage source) {
        // Boost brightness/contrast via RescaleOp
        float scaleFactor = 1.2f;
        float offset = 10.0f;
        RescaleOp rescale = new RescaleOp(scaleFactor, offset, null);
        BufferedImage result = new BufferedImage(
                source.getWidth(), source.getHeight(), source.getType());
        rescale.filter(source, result);
        return result;
    }

    private BufferedImage sharpen(BufferedImage source) {
        float[] sharpenMatrix = {
            0.0f, -0.5f, 0.0f,
           -0.5f,  3.0f, -0.5f,
            0.0f, -0.5f, 0.0f
        };
        Kernel kernel = new Kernel(3, 3, sharpenMatrix);
        ConvolveOp op = new ConvolveOp(kernel, ConvolveOp.EDGE_NO_OP, null);
        return op.filter(source, null);
    }
}
