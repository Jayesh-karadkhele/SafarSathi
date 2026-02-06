package com.travel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travel.entities.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Used by UserService to check login
    Optional<User> findByEmail(String email);
    
    // Used by UserService to prevent duplicate registrations
    boolean existsByEmail(String email);
}