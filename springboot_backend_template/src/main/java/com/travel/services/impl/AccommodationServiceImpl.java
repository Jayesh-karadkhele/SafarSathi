package com.travel.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travel.entities.Accommodation;
import com.travel.entities.Trip;
import com.travel.repositories.AccommodationRepository;
import com.travel.repositories.TripRepository;
import com.travel.services.AccommodationService;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepo;
    
    @Autowired
    private TripRepository tripRepo;

    @Override
    public Accommodation addAccommodation(Accommodation acc, Long tripId) {
        // 1. Find the Trip
        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        // 2. Link Accommodation to Trip
        acc.setTrip(trip);
        
        // 3. Save (This will work now because the return types match)
        return accommodationRepo.save(acc);
    }
}