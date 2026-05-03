package com.foodiq.service;

import com.foodiq.dto.UserDTO;
import com.foodiq.exception.ResourceNotFoundException;
import com.foodiq.model.FoodType;
import com.foodiq.model.Role;
import com.foodiq.model.User;
import com.foodiq.repository.UserRepository;
import com.foodiq.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Register a new user. Throws if email already exists.
     */
    public User registerUser(UserDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered: " + dto.getEmail());
        }
        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .goalProtein(dto.getGoalProtein())
                .preference(dto.getPreference())
                .role(Role.USER)
                .allergies(dto.getAllergies())
                .build();
        return userRepository.save(user);
    }

    /**
     * Login: validates credentials and returns a JWT token.
     */
    public String loginUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        return jwtUtil.generateToken(user.getEmail());
    }

    /**
     * Update user preferences: goalProtein, dietary preference, allergies.
     */
    public User updatePreferences(Long userId, Double goalProtein, FoodType preference, List<String> allergies) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        if (goalProtein != null) user.setGoalProtein(goalProtein);
        if (preference != null) user.setPreference(preference);
        if (allergies != null) user.setAllergies(allergies);

        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }
}
