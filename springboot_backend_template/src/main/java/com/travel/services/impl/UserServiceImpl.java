package com.travel.services.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travel.entities.User;
import com.travel.repositories.UserRepository;
import com.travel.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User registerUser(User user) {
        System.out.println("DEBUG: Entering registerUser for email: " + user.getEmail());
        // Ensure email and password are trimmed before saving
        if (user.getEmail() != null)
            user.setEmail(user.getEmail().trim());
        if (user.getPassword() != null)
            user.setPassword(user.getPassword().trim());

        if (userRepo.existsByEmail(user.getEmail())) {
            System.out.println("DEBUG: Email already exists: " + user.getEmail());
            throw new RuntimeException("Email already registered!");
        }

        System.out.println("DEBUG: Saving user to database...");
        try {
            User savedUser = userRepo.save(user);
            System.out.println("DEBUG: User saved with ID: " + savedUser.getUserId());
            return savedUser;
        } catch (Exception e) {
            System.err.println("DEBUG: Save failed: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public User loginUser(String email, String password) {
        // 1. Defensive Trimming
        String cleanEmail = (email != null) ? email.trim() : "";
        String cleanPassword = (password != null) ? password.trim() : "";

        System.out.println("--- Login Attempt Debug ---");
        System.out.println("Searching for email: [" + cleanEmail + "]");

        // 2. Find user by email
        // If this fails, it might be because the Enum mapping crashed during the query
        User user = userRepo.findByEmail(cleanEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + cleanEmail));

        System.out.println("User found in DB. Name: " + user.getName());
        System.out.println("Stored Password: [" + user.getPassword() + "]");
        System.out.println("Input Password: [" + cleanPassword + "]");

        // 3. Strict Password Check
        if (!user.getPassword().equals(cleanPassword)) {
            System.out.println("ERROR: Password Mismatch!");
            throw new RuntimeException("Invalid credentials");
        }

        System.out.println("Login successful for: " + user.getName());
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User updateUser(Long id, User userUpdates) {
        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        if (userUpdates.getName() != null)
            existingUser.setName(userUpdates.getName());
        if (userUpdates.getEmail() != null)
            existingUser.setEmail(userUpdates.getEmail().trim());
        if (userUpdates.getUserRole() != null)
            existingUser.setUserRole(userUpdates.getUserRole());
        if (userUpdates.getPassword() != null)
            existingUser.setPassword(userUpdates.getPassword().trim());

        return userRepo.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }
}