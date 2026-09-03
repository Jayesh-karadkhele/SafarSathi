import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, PlusCircle, Package, Trash2, MapPin, Loader2, LogOut } from 'lucide-react';

const VendorOverview = () => {
    const { user } = useAuth();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPackages();
    }, [user]);

    const loadPackages = async () => {
        try {
            const res = await api.get('/packages');
            const vendorPkgs = res.data.filter(p => String(p.vendorId) === String(user?.userId));
            setPackages(vendorPkgs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (pkgId) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await api.delete(`/packages/${pkgId}`);
                alert("Package deleted successfully");
                loadPackages();
            } catch (err) {
                alert("Error deleting package");
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-3xl text-white shadow-lg">
                <h3 className="text-3xl font-black mb-2">Vendor Command Center</h3>
                <p className="text-purple-100 text-base font-medium">
                    Welcome back, {user?.name || 'Partner'}! Manage your holiday packages and create new experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Packages</p>
                    <p className="text-3xl font-black text-purple-600 mt-2">{packages.length}</p>
                </div>
            </div>

            <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Your Published Packages</h4>
                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="animate-spin text-purple-600" size={32} />
                    </div>
                ) : packages.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-gray-200">
                        <Package className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                        <p className="text-gray-500 font-medium">No packages published yet. Create your first package!</p>
                        <Link to="/vendor/create" className="inline-block mt-4 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm">
                            Create Package
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map(pkg => (
                            <div key={pkg.packageId} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={pkg.imageUrl || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"} alt={pkg.packageName} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-black text-purple-600">
                                            ₹{pkg.price}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h5 className="font-bold text-gray-800 text-lg mb-2">{pkg.packageName}</h5>
                                        <p className="text-gray-500 text-sm line-clamp-2">{pkg.description}</p>
                                    </div>
                                </div>
                                <div className="p-5 pt-0 flex justify-end">
                                    <button onClick={() => handleDelete(pkg.packageId)} className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const CreatePackage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pkg, setPkg] = useState({
        packageName: '',
        description: '',
        price: '',
        imageUrl: '',
        highlights: '',
        restaurants: ''
    });

    const handleChange = (e) => {
        setPkg({ ...pkg, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const vendorId = localStorage.getItem("userId");
        if (!vendorId) {
            alert("Vendor not logged in");
            setLoading(false);
            return;
        }

        const payload = { ...pkg, price: Number(pkg.price) };

        try {
            await api.post(`/packages/${vendorId}`, payload);
            alert("Package created successfully!");
            navigate('/vendor');
        } catch (err) {
            alert("Failed to create package: " + (err.response?.data?.message || err.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Travel Package</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Package Name</label>
                    <input name="packageName" placeholder="e.g. Royal Rajasthan Tour" value={pkg.packageName} onChange={handleChange} required className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (INR)</label>
                        <input type="number" name="price" placeholder="15000" value={pkg.price} onChange={handleChange} required className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                        <input name="imageUrl" placeholder="https://..." value={pkg.imageUrl} onChange={handleChange} required className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                    <textarea name="description" rows={3} placeholder="Provide details about the itinerary..." value={pkg.description} onChange={handleChange} required className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Highlights (Optional)</label>
                    <input name="highlights" placeholder="City tour, Desert Safari, Hotel Stay" value={pkg.highlights} onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Restaurants Nearby (Optional)</label>
                    <input name="restaurants" placeholder="Spice Court, Chokhi Dhani" value={pkg.restaurants} onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500" />
                </div>
                <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3.5 rounded-xl font-bold transition-all shadow-md">
                    {loading ? "Publishing..." : "Publish Package"}
                </button>
            </form>
        </div>
    );
};

const VendorDashboardLayout = () => {
    const { logout } = useAuth();
    return (
        <div className="flex min-h-screen bg-gray-50 pt-20">
            <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-purple-600">SafarSaathi Partner</h2>
                    <nav className="space-y-2">
                        <Link to="/vendor" className="flex items-center gap-3 p-3 hover:bg-purple-50 text-gray-700 font-bold rounded-xl transition-colors">
                            <LayoutDashboard size={18} /> Overview
                        </Link>
                        <Link to="/vendor/create" className="flex items-center gap-3 p-3 hover:bg-purple-50 text-gray-700 font-bold rounded-xl transition-colors">
                            <PlusCircle size={18} /> Create Package
                        </Link>
                    </nav>
                </div>
                <button onClick={logout} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 w-full p-3 rounded-xl transition-colors">
                    <LogOut size={18} /> Logout
                </button>
            </aside>
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};

const VendorDashboard = () => (
    <Routes>
        <Route element={<VendorDashboardLayout />}>
            <Route index element={<VendorOverview />} />
            <Route path="create" element={<CreatePackage />} />
        </Route>
    </Routes>
);

export default VendorDashboard;
