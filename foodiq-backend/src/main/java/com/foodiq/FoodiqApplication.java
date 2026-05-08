package com.foodiq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FoodiqApplication {
	public static void main(String[] args) {
		System.setProperty("jna.library.path", "/opt/homebrew/lib");
		SpringApplication.run(FoodiqApplication.class, args);
	}
}
