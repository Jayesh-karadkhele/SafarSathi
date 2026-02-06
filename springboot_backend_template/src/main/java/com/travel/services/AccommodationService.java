package com.travel.services;

import com.travel.entities.Accommodation;

public interface AccommodationService {
    // ⚠️ Return type must be 'Accommodation', NOT 'void'
    Accommodation addAccommodation(Accommodation accommodation, Long tripId);
}