package com.travel.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travel.entities.Transportation;
import com.travel.entities.Trip;
import com.travel.repositories.TransportationRepository;
import com.travel.repositories.TripRepository;
import com.travel.services.TransportationService;
import java.util.List;

@Service
public class TransportationServiceImpl implements TransportationService {

    @Autowired
    private TransportationRepository transportRepo;
    
    @Autowired
    private TripRepository tripRepo;

    @Override
    public Transportation addTransport(Transportation transport, Long tripId) {
        // 1. Find the Trip first
        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with ID: " + tripId));
        
        // 2. Link the Transport to the Trip
        transport.setTrip(trip);
        
        // 3. Save
        return transportRepo.save(transport);
    }

    @Override
    public List<Transportation> getTransportByTrip(Long tripId) {
        // This relies on a custom query or simple JPA filtering
        // For now, let's filter manually or use a repository method if you added one
        // A simple way without changing Repo:
        // return transportRepo.findAll().stream()
        //        .filter(t -> t.getTrip().getId().equals(tripId))
        //        .toList();
        
        // BETTER WAY (Add this method to your Repo later):
        // return transportRepo.findByTripId(tripId);
        return null; // Placeholder until you need this
    }
}