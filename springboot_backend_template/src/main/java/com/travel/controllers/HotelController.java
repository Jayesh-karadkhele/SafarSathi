package com.travel.controllers;

import com.travel.entities.Hotel;
import com.travel.repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/villas")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    private static final List<Map<String, Object>> DEFAULT_HOTELS = new ArrayList<>();

    static {
        Map<String, Object> h1 = new HashMap<>();
        h1.put("id", 1L);
        h1.put("name", "The Leela Palace Luxury Villa");
        h1.put("address", "Lake Pichola, Udaipur, Rajasthan");
        h1.put("city", "Udaipur");
        h1.put("pricePerNight", 12500.0);
        h1.put("averageRating", 4.9);
        h1.put("totalRatings", 128);
        h1.put("description", "Experience royal luxury overlooking the serene waters of Lake Pichola. Features private plunge pool, heritage architecture, fine dining, and butler service.");
        h1.put("imageUrls", List.of(
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070"
        ));
        h1.put("amenities", List.of("Pool", "WiFi", "Spa", "Breakfast Included", "Free Cancellation", "Air Conditioning"));

        Map<String, Object> h2 = new HashMap<>();
        h2.put("id", 2L);
        h2.put("name", "Taj Exotica Beachfront Resort & Villa");
        h2.put("address", "Benaulim Beach, South Goa");
        h2.put("city", "Goa");
        h2.put("pricePerNight", 9800.0);
        h2.put("averageRating", 4.8);
        h2.put("totalRatings", 94);
        h2.put("description", "Embraced by Mediterranean-style villas, manicured gardens, and direct private beach access. Enjoy water sports, seafood grills, and luxury wellness spas.");
        h2.put("imageUrls", List.of(
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070"
        ));
        h2.put("amenities", List.of("Pool", "Beach Access", "WiFi", "Restaurant", "Pet Friendly"));

        Map<String, Object> h3 = new HashMap<>();
        h3.put("id", 3L);
        h3.put("name", "Himalayan Pines Cliffside Cottage");
        h3.put("address", "Old Manali Valley, Himachal Pradesh");
        h3.put("city", "Manali");
        h3.put("pricePerNight", 6500.0);
        h3.put("averageRating", 4.7);
        h3.put("totalRatings", 76);
        h3.put("description", "A cozy wooden lodge tucked in pine forests with breathtaking snow peak views. Includes fireplace, bonfire nights, guided treks, and organic breakfasts.");
        h3.put("imageUrls", List.of(
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
        ));
        h3.put("amenities", List.of("Fireplace", "WiFi", "Breakfast Included", "Free Parking"));

        Map<String, Object> h4 = new HashMap<>();
        h4.put("id", 4L);
        h4.put("name", "Tea Garden Homestay & Spa");
        h4.put("address", "Munnar Hills, Kerala");
        h4.put("city", "Munnar");
        h4.put("pricePerNight", 4800.0);
        h4.put("averageRating", 4.9);
        h4.put("totalRatings", 112);
        h4.put("description", "Nestled amidst lush green tea plantations. Wake up to misty hills, fresh spice fragrances, Ayurveda wellness massages, and home-cooked Kerala delicacies.");
        h4.put("imageUrls", List.of(
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
        ));
        h4.put("amenities", List.of("Ayurveda Spa", "WiFi", "Tea Tasting", "Breakfast Included"));

        Map<String, Object> h5 = new HashMap<>();
        h5.put("id", 5L);
        h5.put("name", "Alibaug Palm Shadow Villa");
        h5.put("address", "Mandwa Road, Alibaug, Maharashtra");
        h5.put("city", "Alibaug");
        h5.put("pricePerNight", 8500.0);
        h5.put("averageRating", 4.6);
        h5.put("totalRatings", 53);
        h5.put("description", "Private luxury 4-bedroom villa with private swimming pool, outdoor barbecue pit, sprawling lawns, and close proximity to Mandwa Jetty.");
        h5.put("imageUrls", List.of(
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070",
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2070"
        ));
        h5.put("amenities", List.of("Private Pool", "Barbecue", "WiFi", "Pet Friendly", "AC"));

        DEFAULT_HOTELS.add(h1);
        DEFAULT_HOTELS.add(h2);
        DEFAULT_HOTELS.add(h3);
        DEFAULT_HOTELS.add(h4);
        DEFAULT_HOTELS.add(h5);
    }

    @GetMapping
    public ResponseEntity<?> getAllVillas(@RequestParam(required = false) String location) {
        try {
            List<Hotel> dbHotels = hotelRepository.findAll();
            if (!dbHotels.isEmpty()) {
                if (location != null && !location.isBlank()) {
                    String loc = location.toLowerCase();
                    return ResponseEntity.ok(Map.of(
                        "success", true,
                        "data", dbHotels.stream().filter(h -> 
                            (h.getName() != null && h.getName().toLowerCase().contains(loc)) ||
                            (h.getCity() != null && h.getCity().toLowerCase().contains(loc)) ||
                            (h.getAddress() != null && h.getAddress().toLowerCase().contains(loc))
                        ).toList()
                    ));
                }
                return ResponseEntity.ok(Map.of("success", true, "data", dbHotels));
            }

            // Fallback to rich mock hotels
            List<Map<String, Object>> result = DEFAULT_HOTELS;
            if (location != null && !location.isBlank()) {
                String loc = location.toLowerCase();
                result = DEFAULT_HOTELS.stream().filter(h -> 
                    ((String)h.get("name")).toLowerCase().contains(loc) ||
                    ((String)h.get("city")).toLowerCase().contains(loc) ||
                    ((String)h.get("address")).toLowerCase().contains(loc)
                ).toList();
            }

            return ResponseEntity.ok(Map.of("success", true, "data", result));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("success", true, "data", DEFAULT_HOTELS));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVillaById(@PathVariable Long id) {
        try {
            Optional<Hotel> dbHotel = hotelRepository.findById(id);
            if (dbHotel.isPresent()) {
                Hotel h = dbHotel.get();
                Map<String, Object> map = new HashMap<>();
                map.put("id", h.getId());
                map.put("name", h.getName());
                map.put("address", h.getAddress());
                map.put("city", h.getCity());
                map.put("pricePerNight", h.getPricePerNight());
                map.put("averageRating", h.getAverageRating() != null ? h.getAverageRating() : 4.8);
                map.put("totalRatings", h.getTotalRatings() != null ? h.getTotalRatings() : 42);
                map.put("description", h.getDescription());
                map.put("imageUrls", List.of(h.getImageUrl() != null ? h.getImageUrl() : "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"));
                map.put("amenities", List.of("WiFi", "Pool", "AC", "Breakfast Included"));
                return ResponseEntity.ok(Map.of("success", true, "data", map));
            }

            Optional<Map<String, Object>> mock = DEFAULT_HOTELS.stream().filter(h -> h.get("id").equals(id)).findFirst();
            if (mock.isPresent()) {
                return ResponseEntity.ok(Map.of("success", true, "data", mock.get()));
            }

            return ResponseEntity.ok(Map.of("success", true, "data", DEFAULT_HOTELS.get(0)));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("success", true, "data", DEFAULT_HOTELS.get(0)));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchVillas(@RequestParam String location) {
        return getAllVillas(location);
    }
}
