import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Star, MapPin, ShieldCheck, Check, Info, ArrowLeft, Loader2, 
    Calendar, Users, DollarSign, Wifi, Coffee, Sparkles, Heart, Share2 
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const HotelDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
    const [checkOut, setCheckOut] = useState(
        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );
    const [guests, setGuests] = useState(2);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        fetchHotelDetails();
    }, [id]);

    const fetchHotelDetails = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/villas/${id}`);
            const data = res.data?.data || res.data;
            setHotel(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 1;
        const d1 = new Date(checkIn);
        const d2 = new Date(checkOut);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    const nights = calculateNights();
    const pricePerNight = hotel?.pricePerNight || 5000;
    const totalAmount = pricePerNight * nights;

    const handleBookHotel = async () => {
        if (!user) {
            alert("Please login to complete your stay booking.");
            navigate('/login');
            return;
        }

        setBookingLoading(true);

        const tripPayload = {
            tripName: `${hotel.name} Stay (${nights} Nights)`,
            budget: totalAmount,
            tripStatus: "SCHEDULED",
            packageTier: "LUXURY",
            startDate: checkIn,
            endDate: checkOut
        };

        try {
            const tripResponse = await api.post(`/trips/${user.userId}`, tripPayload);
            const createdTrip = tripResponse.data;
            const tripId = createdTrip.tripId;

            const orderResponse = await api.post('/payments/create-order', {
                amount: totalAmount,
                userId: user.userId
            });

            const { razorpayOrderId, amount, currency, keyId } = orderResponse.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "SafarSaathi Stays",
                description: `Reservation for ${hotel.name}`,
                order_id: razorpayOrderId,
                handler: async function (response) {
                    try {
                        await api.post('/payments/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            tripId: tripId.toString()
                        });

                        alert("Hotel Reservation Confirmed! Your stay details are in My Trips.");
                        navigate('/customer/my-bookings');
                    } catch (verifyError) {
                        alert(verifyError.response?.data?.message || "Payment verification failed.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email
                },
                theme: {
                    color: "#0284c7"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (error) {
            alert("Booking initiation failed. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="animate-spin text-sky-400" size={40} />
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
                <Info size={48} className="text-slate-500" />
                <h2 className="text-xl font-bold">Hotel not found</h2>
                <button onClick={() => navigate('/hotels')} className="text-sky-400 font-bold uppercase text-xs">Return to Hotels</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/hotels')}
                    className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/80 px-4 py-2 rounded-full border border-white/10 text-xs font-bold transition-all"
                >
                    <ArrowLeft size={16} /> Back to All Stays
                </button>

                {/* Title Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-black uppercase tracking-widest border border-sky-400/30">
                            <Sparkles size={12} /> Stayinn Verified Villa
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{hotel.name}</h1>
                        <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
                            <MapPin size={16} className="text-sky-400" /> {hotel.address || hotel.city}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-1">
                            <Star size={16} className="fill-sky-400" /> {hotel.averageRating || 4.8} ({hotel.totalRatings || 42} Reviews)
                        </span>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] rounded-3xl overflow-hidden border border-white/10">
                    <div className="md:col-span-2 h-full">
                        <img
                            src={hotel.imageUrls?.[0] || hotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="hidden md:grid grid-rows-2 gap-4 h-full">
                        <img
                            src={hotel.imageUrls?.[1] || "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070"}
                            alt="Sub Image 1"
                            className="w-full h-full object-cover"
                        />
                        <img
                            src={hotel.imageUrls?.[2] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070"}
                            alt="Sub Image 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Amenities */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl space-y-4">
                            <h2 className="text-2xl font-black text-white flex items-center gap-2">
                                <Info className="text-sky-400" size={22} /> About this Stay
                            </h2>
                            <p className="text-slate-300 leading-relaxed font-medium">
                                {hotel.description || "Indulge in a world-class luxury stay experience. Complete with private pools, serene natural surroundings, gourmet dining, and top-tier hospitality."}
                            </p>
                        </section>

                        <section className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-2">
                                <ShieldCheck className="text-sky-400" size={22} /> Key Amenities
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {["Private Pool", "High-Speed WiFi", "Spa & Wellness", "Breakfast Included", "Free Parking", "Air Conditioning"].map(item => (
                                    <div key={item} className="flex items-center gap-3 bg-slate-800/60 p-4 rounded-2xl border border-white/5">
                                        <Check size={18} className="text-sky-400" />
                                        <span className="text-xs font-bold text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Reservation Sidebar */}
                    <div className="h-fit lg:sticky lg:top-24">
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
                            <div className="flex justify-between items-baseline pb-4 border-b border-white/10">
                                <div>
                                    <span className="text-3xl font-black text-sky-400">₹{pricePerNight.toLocaleString()}</span>
                                    <span className="text-xs text-slate-400 font-medium"> / night</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Best Rate Guarantee</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">Check-in Date</label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 p-3 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-sky-400"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">Check-out Date</label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 p-3 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-sky-400"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        className="w-full bg-slate-800 border border-white/10 p-3 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-sky-400"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-slate-800/60 rounded-2xl border border-white/5 space-y-2 text-xs">
                                <div className="flex justify-between text-slate-300">
                                    <span>₹{pricePerNight.toLocaleString()} × {nights} nights</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-black text-sm text-white pt-2 border-t border-white/10">
                                    <span>Total Amount</span>
                                    <span className="text-sky-400">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBookHotel}
                                disabled={bookingLoading}
                                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-sky-500/25 transition-all duration-300"
                            >
                                {bookingLoading ? "Processing Booking..." : "Reserve & Pay Now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetail;
