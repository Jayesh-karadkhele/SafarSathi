package com.travel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travel.entities.Bookings;

public interface BookingRepository extends JpaRepository<Bookings, Long> {
    // No special methods needed yet, standard save() is enough
}