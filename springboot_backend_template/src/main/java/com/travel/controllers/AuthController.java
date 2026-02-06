package com.travel.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.travel.dtos.LoginDto;
import com.travel.dtos.RegisterDto;
import com.travel.entities.User;
import com.travel.entities.UserRole;
import com.travel.services.UserService;
import com.travel.utils.JwtUtils;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // 🔓 RE-ADDED CORS FOR STABILITY
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private com.travel.services.EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            User user = userService.loginUser(loginDto.getEmail(), loginDto.getPassword());

            // 📧 Send login notification
            emailService.sendLoginNotification(user);

            String role = user.getUserRole().name();
            String token = jwtUtils.generateToken(user.getEmail(), role);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userRole", role);
            response.put("name", user.getName());
            response.put("userId", user.getUserId());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto dto) {
        System.out.println("DEBUG: Register request for email: " + dto.getEmail());
        try {
            User user = new User();
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setPassword(dto.getPassword());
            String role = (dto.getUserRole() == null) ? "CUSTOMER" : dto.getUserRole();
            user.setUserRole(UserRole.valueOf(role.toUpperCase()));

            User savedUser = userService.registerUser(user);
            System.out.println("DEBUG: User registered successfully: " + savedUser.getUserId());

            // 📧 Send welcome email
            emailService.sendWelcomeEmail(savedUser);

            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            System.err.println("ERROR during registration: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage() != null ? e.getMessage() : "Unknown error during registration"));
        }
    }
}
