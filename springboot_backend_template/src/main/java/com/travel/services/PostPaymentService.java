package com.travel.services;

import com.travel.entities.Bookings;
import com.travel.services.EmailService;
import com.travel.utils.PdfInvoiceGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class PostPaymentService {

    @Autowired
    private PdfInvoiceGenerator pdfInvoiceGenerator;

    @Autowired
    private EmailService emailService;

    @Async
    public void sendPostPaymentNotificationAsync(Bookings booking) {
        try {
            System.out.println("[POST-PAYMENT] Starting background tasks for Booking ID: " + booking.getBookingId());
            byte[] invoicePdf = pdfInvoiceGenerator.generateInvoice(booking);
            emailService.sendBookingConfirmation(booking.getTrip().getCustomer(), booking, invoicePdf);
            System.out.println("[POST-PAYMENT] Background tasks completed successfully.");
        } catch (Exception e) {
            System.err.println("[POST-PAYMENT] ERROR in background tasks: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
