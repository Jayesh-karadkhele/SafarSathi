package com.travel.entities;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // ⚠️ IMPORT THIS

@Entity
@Table(name="destination")
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class Destinations {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long destId;
	
    // FIX: Link back to Trip + STOP INFINITE LOOP
    @ManyToOne
    @JoinColumn(name = "trip_id")
    @JsonIgnore // <--- ADD THIS
    private Trip trip;
	
	private String destinationName;
	
	@Column(name = "image_url")
    private String imageUrl;
}