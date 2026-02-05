import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeSearch from "../../components/home/HomeSearch";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[500px] bg-gradient-to-b from-[#051322] to-[#15457b] overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
                        className="w-full h-full object-cover mix-blend-overlay"
                        alt="Travel"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg"
                    >
                        SafarSaathi
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/90 text-xl font-bold tracking-wide"
                    >
                        Make Your Travel Dreams Come True
                    </motion.p>
                </div>
            </div>

            {/* Search Widget */}
            <HomeSearch />

            {/* Promotional Content */}
            <div className="relative py-24 overflow-hidden">
                {/* Background Image with Parallax-like effect */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                        alt="Travel Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Handpicked Collections</h2>
                            <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">Unlock your next adventure</p>
                        </div>
                        <button
                            onClick={() => navigate('/packages')}
                            className="text-blue-600 font-black text-sm uppercase tracking-wider hover:underline"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Royal Rajasthan', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80', price: '₹15,999' },
                            { title: 'Mystical Ladakh', img: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80', price: '₹24,499' },
                            { title: 'Tropical Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', price: '₹12,499' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer"
                                onClick={() => navigate('/packages')}
                            >
                                <div className="h-56 overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm font-medium">Starting from</span>
                                        <span className="text-blue-600 font-black text-xl">{item.price}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ================= STYLES ================= */

const container = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage:
        "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    paddingTop: "70px", // ✅ exact height of navbar, removes any top gap
};

const overlay = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
    zIndex: 1,
};

const content = {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "20px",
};

const title = {
    fontSize: "72px",
    fontWeight: "600",
    letterSpacing: "3px",
    marginBottom: "20px",
};

const shayari = {
    fontSize: "20px",
    fontWeight: "300",
    lineHeight: "1.6",
    marginBottom: "15px",
};

const button = {
    marginTop: "30px",
    padding: "14px 40px",
    fontSize: "16px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "white",
    color: "black",
};
