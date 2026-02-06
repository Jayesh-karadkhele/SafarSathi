package com.travel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travel.entities.Accommodation;

// ⚠️ Must extend JpaRepository to get the .save() method
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
}