package com.travel.utils;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import com.travel.entities.Bookings;
import com.travel.entities.Trip;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
public class PdfInvoiceGenerator {

    public byte[] generateInvoice(Bookings booking) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph("SafarSaathi - Your Travel Partner").setFontSize(18).setBold());
            document.add(new Paragraph("Booking Invoice").setFontSize(14).setItalic());
            document.add(new Paragraph("--------------------------------------------------"));

            Trip trip = booking.getTrip();
            String packageName = (trip != null && trip.getSelectedPackage() != null) 
                    ? trip.getSelectedPackage().getPackageName() 
                    : (trip != null && trip.getTripName() != null ? trip.getTripName() : "Custom Trip");
            String tier = (trip != null && trip.getPackageTier() != null) ? trip.getPackageTier().name() : "STANDARD";
            String customerName = (trip != null && trip.getCustomer() != null) ? trip.getCustomer().getName() : "Valued Customer";
            String customerEmail = (trip != null && trip.getCustomer() != null) ? trip.getCustomer().getEmail() : "N/A";
            Double budget = (trip != null && trip.getBudget() != null) ? trip.getBudget() : 0.0;

            document.add(new Paragraph("Booking ID: " + booking.getBookingId()));
            document.add(new Paragraph("Customer Name: " + customerName));
            document.add(new Paragraph("Email: " + customerEmail));
            document.add(new Paragraph("Package: " + packageName));
            document.add(new Paragraph("Booking Date: " + booking.getBookingDate()));
            document.add(new Paragraph("Travel Date: " + (trip != null ? trip.getStartDate() : "N/A")));

            document.add(new Paragraph("\n"));

            Table table = new Table(UnitValue.createPointArray(new float[] { 300f, 100f }));
            table.addCell("Description");
            table.addCell("Amount");

            table.addCell(packageName + " (" + tier + ") trip");
            table.addCell("INR " + budget);

            document.add(table);

            document.add(new Paragraph("\nTotal Amount Paid: INR " + budget).setBold());
            document.add(new Paragraph("\nStatus: CONFIRMED").setBold());

            document.add(new Paragraph("\n\nThank you for booking with SafarSaathi!"));
            document.add(new Paragraph("Wish you a happy and safe journey!"));

            document.close();
        } catch (Exception e) {
            System.err.println("Error generating PDF invoice for booking ID " + (booking != null ? booking.getBookingId() : "null") + ": " + e.getMessage());
            e.printStackTrace();
        }
        return out.toByteArray();
    }
}
