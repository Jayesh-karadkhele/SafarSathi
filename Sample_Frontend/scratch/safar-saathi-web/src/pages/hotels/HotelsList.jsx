import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Hotel as HotelIcon, Star, MapPin, Search, Filter, Sparkles, 
    ArrowRight, Loader2, RefreshCw, Palmtree, Wifi, Coffee, ShieldCheck 
} from 'lucide-react';
import api from '../../api/axios';

const FALLBACK_HOTELS = [
    {
        id: 1,
        name: "The Leela Palace Luxury Villa",
        address: "Lake Pichola, Udaipur, Rajasthan",
        city: "Udaipur",
        pricePerNight: 12500,
        averageRating: 4.9,
        totalRatings: 128,
        description: "Experience royal luxury overlooking the serene waters of Lake Pichola. Features private plunge pool, heritage architecture, fine dining, and butler service.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
        imageUrls: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070"
        ]
    },
    {
        id: 2,
        name: "Taj Exotica Beachfront Resort & Villa",
        address: "Benaulim Beach, South Goa",
        city: "Goa",
        pricePerNight: 9800,
        averageRating: 4.8,
        totalRatings: 94,
        description: "Embraced by Mediterranean-style villas, manicured gardens, and direct private beach access. Enjoy water sports, seafood grills, and luxury wellness spas.",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
        imageUrls: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070"
        ]
    },
    {
        id: 3,
        name: "Himalayan Pines Cliffside Cottage",
        address: "Old Manali Valley, Himachal Pradesh",
        city: "Manali",
        pricePerNight: 6500,
        averageRating: 4.7,
        totalRatings: 76,
        description: "A cozy wooden lodge tucked in pine forests with breathtaking snow peak views. Includes fireplace, bonfire nights, guided treks, and organic breakfasts.",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
        imageUrls: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
        ]
    },
    {
        id: 4,
        name: "Tea Garden Homestay & Spa",
        address: "Munnar Hills, Kerala",
        city: "Munnar",
        pricePerNight: 4800,
        averageRating: 4.9,
        totalRatings: 112,
        description: "Nestled amidst lush green tea plantations. Wake up to misty hills, fresh spice fragrances, Ayurveda wellness massages, and home-cooked Kerala delicacies.",
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070",
        imageUrls: [
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070"
        ]
    },
    {
        id: 5,
        name: "Alibaug Palm Shadow Villa",
        address: "Mandwa Road, Alibaug, Maharashtra",
        city: "Alibaug",
        pricePerNight: 8500,
        averageRating: 4.6,
        totalRatings: 53,
        description: "Private luxury 4-bedroom villa with private swimming pool, outdoor barbecue pit, sprawling lawns, and close proximity to Mandwa Jetty.",
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070",
        imageUrls: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070"
        ]
    }
];

const HotelsList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [hotels, setHotels] = useState(FALLBACK_HOTELS);
    const [filteredHotels, setFilteredHotels] = useState(FALLBACK_HOTELS);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceMax, setPriceMax] = useState(20000);
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search);
            const locParam = params.get('location');
            if (locParam) {
                setSearchQuery(locParam);
            }
        } catch (e) {
            console.error(e);
        }
        fetchHotels();
    }, [location.search]);

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const res = await api.get('/villas');
            const data = res.data?.data || res.data;
            if (Array.isArray(data) && data.length > 0) {
                setHotels(data);
                setFilteredHotels(data);
            } else {
                setHotels(FALLBACK_HOTELS);
                setFilteredHotels(FALLBACK_HOTELS);
            }
        } catch (err) {
            console.error("Failed to fetch hotels from API, using fallback data", err);
            setHotels(FALLBACK_HOTELS);
            setFilteredHotels(FALLBACK_HOTELS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = Array.isArray(hotels) ? [...hotels] : [...FALLBACK_HOTELS];

        if (searchQuery && searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(h => 
                (h.name && h.name.toLowerCase().includes(q)) ||
                (h.city && h.city.toLowerCase().includes(q)) ||
                (h.address && h.address.toLowerCase().includes(q))
            );
        }

        result = result.filter(h => (h.pricePerNight || 0) <= priceMax);

        if (minRating > 0) {
            result = result.filter(h => (h.averageRating || 0) >= minRating);
        }

        setFilteredHotels(result);
    }, [searchQuery, priceMax, minRating, hotels]);

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Hero Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 md:p-14 border border-white/10 shadow-2xl">
                    <div className="relative z-10 max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-widest">
                            <Sparkles size={14} /> Stayinn Powered Stays
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                            Find Your Perfect <span className="text-sky-400">Hotel & Villa Stay</span>
                        </h1>
                        <p className="text-slate-300 text-base font-medium">
                            Handpicked luxury resorts, heritage villas, and cozy homestays integrated seamlessly into SafarSaathi.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by city, hotel name, or location (e.g. Goa, Manali, Udaipur)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-all font-medium text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
                        <img 
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                            alt="Luxury Stay" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>

                {/* Filter Controls & Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl h-fit space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                            <h3 className="font-black text-lg text-white flex items-center gap-2">
                                <Filter size={18} className="text-sky-400" /> Filters
                            </h3>
                            <button 
                                onClick={() => { setSearchQuery(''); setPriceMax(25000); setMinRating(0); }}
                                className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
                            >
                                <RefreshCw size={12} /> Reset
                            </button>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                                Max Price per Night: <span className="text-sky-400 font-black">₹{(priceMax || 20000).toLocaleString()}</span>
                            </label>
                            <input
                                type="range"
                                min="2000"
                                max="25000"
                                step="1000"
                                value={priceMax}
                                onChange={(e) => setPriceMax(Number(e.target.value))}
                                className="w-full accent-sky-400 cursor-pointer"
                            />
                        </div>

                        {/* Rating Filter */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Minimum Rating</label>
                            <div className="grid grid-cols-4 gap-2">
                                {[0, 4.0, 4.5, 4.8].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setMinRating(r)}
                                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                                            minRating === r 
                                            ? 'bg-sky-500 text-white border-sky-400 shadow-md' 
                                            : 'bg-slate-800/60 text-slate-300 border-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        {r === 0 ? 'All' : `${r}★`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Listings Display */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-white tracking-tight">
                                Recommended Hotels & Stays
                            </h2>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-white/10">
                                {(filteredHotels || []).length} Stays Available
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                                <Loader2 size={40} className="animate-spin text-sky-400" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Finding Best Stays...</p>
                            </div>
                        ) : (filteredHotels || []).length === 0 ? (
                            <div className="bg-slate-900/40 border border-dashed border-white/10 rounded-3xl p-16 text-center space-y-3">
                                <Palmtree className="mx-auto text-slate-500" size={48} />
                                <h3 className="text-xl font-bold text-slate-200">No Hotels Found</h3>
                                <p className="text-slate-400 text-sm">Try tweaking your search location or price filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredHotels.map(hotel => (
                                    <motion.div
                                        key={hotel.id}
                                        whileHover={{ y: -6 }}
                                        className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="relative h-52 overflow-hidden">
                                                <img
                                                    src={hotel.imageUrls?.[0] || hotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"}
                                                    alt={hotel.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-sky-400 border border-white/10 flex items-center gap-1">
                                                    <Star size={12} className="fill-sky-400" /> {hotel.averageRating || 4.8} ({hotel.totalRatings || 42} reviews)
                                                </div>
                                                <div className="absolute bottom-4 right-4 bg-blue-600 text-white font-black text-sm px-3.5 py-1.5 rounded-xl shadow-lg">
                                                    ₹{(hotel.pricePerNight || 0).toLocaleString()} <span className="text-[10px] font-normal opacity-80">/ night</span>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                                                    {hotel.name}
                                                </h3>
                                                <p className="text-slate-400 text-xs font-medium flex items-center gap-1">
                                                    <MapPin size={14} className="text-sky-400 flex-shrink-0" />
                                                    <span className="truncate">{hotel.address || hotel.city}</span>
                                                </p>
                                                <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                                                    {hotel.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0">
                                            <button
                                                onClick={() => navigate(`/hotels/${hotel.id}`)}
                                                className="w-full bg-slate-800 hover:bg-sky-600 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-sky-500/20"
                                            >
                                                View & Book Stay <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelsList;
