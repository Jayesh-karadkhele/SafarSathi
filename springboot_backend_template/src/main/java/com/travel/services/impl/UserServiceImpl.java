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
        if (user.getEmail() != null)
            user.setEmail(user.getEmail().trim());
        if (user.getPassword() != null)
            user.setPassword(user.getPassword().trim());

        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        try {
            User savedUser = userRepo.save(user);
            return savedUser;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public User loginUser(String email, String password) {
        String cleanEmail = (email != null) ? email.trim() : "";
        String cleanPassword = (password != null) ? password.trim() : "";

        User user = userRepo.findByEmail(cleanEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + cleanEmail));

        if (!user.getPassword().equals(cleanPassword)) {
            throw new RuntimeException("Invalid credentials");
        }

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