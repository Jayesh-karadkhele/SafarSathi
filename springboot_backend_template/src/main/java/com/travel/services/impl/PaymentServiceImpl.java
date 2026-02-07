package com.travel.services.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.travel.dtos.PaymentRequest;
import com.travel.dtos.PaymentResponse;
import com.travel.entities.*;
import com.travel.repositories.*;
import com.travel.services.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PackagesRepository packagesRepository;

    @Autowired
    private com.travel.services.PostPaymentService postPaymentService;

    @Override
    public PaymentResponse createOrder(PaymentRequest request) throws Exception {
        System.out.println("[CREATE-ORDER] Request for user ID: " + request.getUserId());
        System.out.println("[CREATE-ORDER] Using Razorpay Key ID: "
                + (keyId != null && keyId.length() > 5 ? keyId.substring(0, 8) + "..." : "EMPTY"));
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (request.getAmount() * 100)); // amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(orderRequest);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Payment payment = Payment.builder()
                .razorpayOrderId(order.get("id"))
                .amount(request.getAmount())
                .currency("INR")
                .status(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        paymentRepository.save(payment);

        return PaymentResponse.builder()
                .razorpayOrderId(order.get("id"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .keyId(keyId)
                .build();
    }

    @Override
    public boolean verifyPayment(Map<String, String> data) throws Exception {
        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");

        // SAFAR-SAATHI FIX: Retrieve Trip ID to link booking
        String tripIdStr = data.get("tripId");
        if (tripIdStr == null || tripIdStr.isEmpty() || tripIdStr.equals("undefined")) {
            System.err.println("ERROR: Trip ID missing in payment verification data: " + data);
            throw new RuntimeException("Trip ID is missing. Cannot verify payment.");
        }
        Long tripId = Long.parseLong(tripIdStr);

        System.out.println("DEBUG: Verifying payment for Order ID: " + orderId + " and Trip ID: " + tripId);

        // 🔥 CRITICAL FIX: Only pass the 3 required fields to verifyPaymentSignature
        // Including tripId or other custom fields will cause signature mismatch!
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);

        boolean isValid = Utils.verifyPaymentSignature(options, keySecret);
        System.out.println("DEBUG: Signature valid: " + isValid);

        if (isValid) {
            Payment payment = paymentRepository.findByRazorpayOrderId(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

            // 1. Update Payment
            payment.setRazorpayPaymentId(paymentId);
            payment.setRazorpaySignature(signature);
            payment.setStatus(PaymentStatus.COMPLETED);

            // 2. Fetch Trip
            Trip trip = tripRepository.findById(tripId)
                    .orElseThrow(() -> new RuntimeException("Trip not found with ID: " + tripId));

            // 3. Create & Link Booking
            Bookings booking = new Bookings();
            booking.setTrip(trip);
            booking.setBookingDate(LocalDate.now());
            booking.setBookingsStatus(BookingStatus.CONFIRMED);

            Bookings savedBooking = bookingRepository.save(booking);

            // 5. Link Payment to Booking
            payment.setBooking(savedBooking);
            // 6. Update Trip Status to CONFIRMED for clear "PAID" status
            trip.setTripStatus(TripStatus.CONFIRMED);
            tripRepository.save(trip);
            paymentRepository.save(payment);

            // 🚀 7. TRULY ASYNC POST-PAYMENT TASKS
            // Moved to a separate service to ensure it runs in a background thread
            postPaymentService.sendPostPaymentNotificationAsync(savedBooking);

            return true;
        } else {
            System.out.println("DEBUG: Signature verification failed.");
            Payment payment = paymentRepository.findByRazorpayOrderId(orderId).orElse(null);
            if (payment != null) {
                payment.setStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);
            }
            return false;
        }
    }
}
