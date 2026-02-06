package com.travel.entities;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "packages")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "trips") // Good practice to exclude lists from ToString to avoid recursion
public class Packages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageId;

    private String packageName;
    private Double price;

    @Column(length = 2000)
    private String description;

    @Column(name = "image_url", length = 2000)
    private String imageUrl;

    @Column(length = 2000)
    private String highlights; // Example: "Breakfast, WiFi, Pool, Guided Tour"

    private String restaurants; // Example: "Ocean Blue, Spicy Garden, The Terrace"

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    @JsonIgnore
    private User vendor;

    // --- UPDATED RELATIONSHIP ---
    @OneToMany(mappedBy = "selectedPackage", cascade = CascadeType.ALL, // 👈 Fixes the MySQL Error 1451
            orphanRemoval = true // 👈 Cleans up trips that no longer have a package
    )
    @JsonIgnore
    private List<Trip> trips = new ArrayList<>();
}