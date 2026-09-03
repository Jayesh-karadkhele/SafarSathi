import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import PackageList from '../pages/customer/PackageList';
import PackageDetail from '../pages/customer/PackageDetail';
import VendorDashboard from '../pages/vendor/VendorDashboard';
import AddPackage from '../pages/admin/AddPackage';
import HotelsList from '../pages/hotels/HotelsList';
import HotelDetail from '../pages/hotels/HotelDetail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/packages" element={<PackageList />} />
                <Route path="/packages/:id" element={<PackageDetail />} />
                
                {/* Stayinn Integrated Hotel Routes */}
                <Route path="/hotels" element={<HotelsList />} />
                <Route path="/hotels/stay" element={<HotelsList />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />

                <Route
                    path="/customer/*"
                    element={
                        <ProtectedRoute allowedRoles={['CUSTOMER', 'Customer']}>
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/vendor/*"
                    element={
                        <ProtectedRoute allowedRoles={['VENDOR', 'Vendor']}>
                            <VendorDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/vendor/add-package"
                    element={
                        <ProtectedRoute allowedRoles={['VENDOR', 'Vendor']}>
                            <AddPackage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;