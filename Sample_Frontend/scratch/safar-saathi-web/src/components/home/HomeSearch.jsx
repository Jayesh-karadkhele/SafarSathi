import React, { useState } from 'react';
import { Plane, Hotel, Home, Train, Bus, Car, Palmtree, CreditCard, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeSearch = () => {
    const [activeTab, setActiveTab] = useState('Flights');
    const navigate = useNavigate();

    const tabs = [
        { name: 'Flights', icon: <Plane size={24} />, label: "Book Flights" },
        { name: 'Hotels', icon: <Hotel size={24} />, label: "Book Hotels" },
        { name: 'Homestays', icon: <Home size={24} />, label: "Book Homestays" },
        { name: 'Holiday Packages', icon: <Palmtree size={24} />, label: "Holiday Packages" },
        { name: 'Trains', icon: <Train size={24} />, label: "Book Trains" },
        { name: 'Buses', icon: <Bus size={24} />, label: "Book Buses" },
        { name: 'Cabs', icon: <Car size={24} />, label: "Book Cabs" },
        { name: 'Forex', icon: <CreditCard size={24} />, label: "Forex Card & Currency" },
        { name: 'Charter Flights', icon: <Plane size={24} />, label: "Book Charter Flights" },
    ];

    const renderSearchFields = () => {
        switch (activeTab) {
            case 'Flights':
            case 'Charter Flights':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From</span>
                            <span className="text-2xl font-black text-gray-800 block">Delhi</span>
                            <span className="text-xs text-gray-500 truncate block w-full">DEL, Delhi Airport India</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To</span>
                            <span className="text-2xl font-black text-gray-800 block">Mumbai</span>
                            <span className="text-xs text-gray-500 truncate block w-full">BOM, Chhatrapati Shivaji Int'l Airport</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Departure</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">24 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Tuesday</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Return</span>
                            <span className="text-xs font-bold text-gray-400 mt-2 block">Tap to add a return date for bigger discounts</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Travellers & Class</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">1 <span className="text-lg">Traveller</span></span>
                            <span className="text-xs text-gray-500 block">Economy/Premium Economy</span>
                        </div>
                    </div>
                );
            case 'Hotels':
            case 'Homestays':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all md:col-span-1">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">City, Property or Location</span>
                            <span className="text-2xl font-black text-gray-800 block">Goa</span>
                            <span className="text-xs text-gray-500 truncate block w-full">India</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Check-in</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">24 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Tuesday</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Check-out</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">25 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Wednesday</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Guests</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">2 <span className="text-lg">Adults</span></span>
                            <span className="text-xs text-gray-500 block">1 Room</span>
                        </div>
                    </div>
                );
            case 'Holiday Packages':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From City</span>
                            <span className="text-2xl font-black text-gray-800 block">New Delhi</span>
                            <span className="text-xs text-gray-500 truncate block w-full">India</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To Destination/Package</span>
                            <span className="text-2xl font-black text-gray-800 block">Goa</span>
                            <span className="text-xs text-gray-500 truncate block w-full">India</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Departure Month</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">Sep <span className="text-lg">2024</span></span>
                            <span className="text-xs text-gray-500 block">Flexible dates</span>
                        </div>
                    </div>
                );
            case 'Trains':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From</span>
                            <span className="text-2xl font-black text-gray-800 block">Delhi</span>
                            <span className="text-xs text-gray-500 truncate block w-full">NDLS, New Delhi Railway Station</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To</span>
                            <span className="text-2xl font-black text-gray-800 block">Mumbai</span>
                            <span className="text-xs text-gray-500 truncate block w-full">BCT, Mumbai Central</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Travel Date</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">24 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Tuesday</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Class</span>
                            <span className="text-2xl font-black text-gray-800 block">All</span>
                            <span className="text-xs text-gray-500 block">All Classes</span>
                        </div>
                    </div>
                );
            case 'Buses':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From</span>
                            <span className="text-2xl font-black text-gray-800 block">Delhi</span>
                            <span className="text-xs text-gray-500 truncate block w-full">India</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To</span>
                            <span className="text-2xl font-black text-gray-800 block">Manali</span>
                            <span className="text-xs text-gray-500 truncate block w-full">Himachal Pradesh</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Travel Date</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">24 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Tuesday</span>
                        </div>
                    </div>
                );
            case 'Cabs':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From</span>
                            <span className="text-2xl font-black text-gray-800 block">Delhi</span>
                            <span className="text-xs text-gray-500 truncate block w-full">India</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To</span>
                            <span className="text-2xl font-black text-gray-800 block">Agra</span>
                            <span className="text-xs text-gray-500 truncate block w-full">Uttar Pradesh</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Depart</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">24 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Tuesday</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Pickup Time</span>
                            <span className="text-2xl font-black text-gray-800 block">10:00</span>
                            <span className="text-xs text-gray-500 block">AM</span>
                        </div>
                    </div>
                );
            case 'Forex':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Select Currency</span>
                            <span className="text-2xl font-black text-gray-800 block">USD</span>
                            <span className="text-xs text-gray-500 block">US Dollar</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Amount</span>
                            <span className="text-2xl font-black text-gray-800 block">1,000</span>
                            <span className="text-xs text-gray-500 block">Min 500</span>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="p-4 text-center text-gray-500">
                        Feature coming soon!
                    </div>
                );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Tabs */}
                <div className="flex justify-between items-center px-4 py-2 border-b bg-white overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex flex-col items-center gap-1 px-4 py-3 min-w-[80px] transition-all relative group
                                ${activeTab === tab.name ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                        >
                            <span className={`transform transition-transform duration-200 group-hover:scale-110 ${activeTab === tab.name ? 'text-blue-600' : 'text-gray-400'}`}>
                                {tab.icon}
                            </span>
                            <span className={`text-[10px] font-bold whitespace-nowrap uppercase tracking-wider mt-1 ${activeTab === tab.name ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                                {tab.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search Form */}
                <div className="p-8 pb-12">
                    <div className="mb-8">
                        {renderSearchFields()}
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div className="flex gap-4">
                            {/* Only show trip type for Flights */}
                            {(activeTab === 'Flights' || activeTab === 'Charter Flights') && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name="trip" id="one-way" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <label htmlFor="one-way" className="text-xs font-bold text-gray-700 cursor-pointer uppercase">One Way</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name="trip" id="round-trip" className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <label htmlFor="round-trip" className="text-xs font-bold text-gray-700 cursor-pointer uppercase">Round Trip</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name="trip" id="multi-city" className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <label htmlFor="multi-city" className="text-xs font-bold text-gray-700 cursor-pointer uppercase">Multi City</label>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Centered Search Button */}
                        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                            <button
                                onClick={() => navigate('/packages')}
                                className="bg-gradient-to-r from-[#008cff] to-[#005eff] text-white px-16 py-3 rounded-full font-black text-2xl shadow-xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-4 border-white"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
