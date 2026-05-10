package com.foodiq.security;

import com.foodiq.util.JwtUtil;
import com.foodiq.model.User;
import com.foodiq.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Value("${app.frontend.url:http://localhost:5174}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        if (email == null) {
            // Some providers might not return email by default
            email = oAuth2User.getAttribute("login") + "@github.com"; 
            if (name == null) {
                name = oAuth2User.getAttribute("login");
            }
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setPassword(UUID.randomUUID().toString()); // dummy password for oauth2 users
            user.setGoalProtein(100.0); // default
            userRepository.save(user);
        }

        String token = jwtUtil.generateToken(user.getEmail());
        
        String redirectUrl = frontendUrl + "/oauth2/redirect?token=" + token + "&name=" + java.net.URLEncoder.encode(user.getName(), "UTF-8");
        
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
