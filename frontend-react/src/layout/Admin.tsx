import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebars/AdminSidebar";
import Navbar from "../components/Navbars/AdminNavbar";
import HeaderStats from "../components/Header/HeaderStats";

import Dashboard from "../views/Admin/Dashboard";
import ClientList from "../views/Admin/ClientList";
import Category from "../views/Admin/Category/Category";
import Product from "../views/Admin/Product/Product";

const Admin: React.FC = () => {
  const location = useLocation();
  const showHeaderStats = location.pathname === "/admin/dashboard";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 md:ml-64">
        {/* Navbar fixe en haut */}
        <Navbar />

        {/* HeaderStats conditionnel */}
        {showHeaderStats && <HeaderStats />}

        {/* Contenu des pages */}
        <div className={`px-4 md:px-8 mx-auto w-full ${showHeaderStats ? '-mt-32' : 'pt-24'} pb-8`}>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products/*" element={<Product />} />
              <Route path="client" element={<ClientList />} />
              <Route path="categories/*" element={<Category />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;