package com.pawmarket.controllers;

import com.pawmarket.models.User;
import com.pawmarket.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // READ - Get all users (Profiles)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // READ - Get user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    // UPDATE - Update user profile
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable UUID id, @RequestBody User updatedUser) {
        Optional<User> existing = userRepository.findById(id);
        if (existing.isPresent()) {
            User user = existing.get();
            if (updatedUser.getFullName() != null) user.setFullName(updatedUser.getFullName());
            if (updatedUser.getRole() != null) user.setRole(updatedUser.getRole());
            if (updatedUser.getLoyaltyPoints() != null) user.setLoyaltyPoints(updatedUser.getLoyaltyPoints());
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Delete a user profile
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("Profile deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}

