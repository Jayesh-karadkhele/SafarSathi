package com.travel.entities;

public enum BookingStatus {
	 PENDING,        // booked but not confirmed
	    CONFIRMED,      // payment done / seat locked
	    CANCELLED,      // user or system cancelled
	    COMPLETED,      // trip finished & booking consumed
	    NO_SHOW         // user didn't board
}
