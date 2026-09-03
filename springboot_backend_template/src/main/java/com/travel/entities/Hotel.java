package com.travel.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hotels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String address;

    private String city;

    private Double pricePerNight;

    private Double averageRating;

    private Integer totalRatings;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String imageUrl;

    @Column(length = 2000)
    private String amenities;
}
