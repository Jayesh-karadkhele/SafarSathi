package com.travel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travel.entities.Trip;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    // Matches Trip entity field "customer" -> User entity field "userId"
    List<Trip> findByCustomerUserId(Long userId);
}