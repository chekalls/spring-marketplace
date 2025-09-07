import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Sidebar: React.FC = () => {
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "fa-chart-line" },
    { path: "/admin/products", label: "Produits", icon: "fa-box-open" },
    { path: "/admin/categories", label: "Catégories", icon: "fa-layer-group" },
    { path: "/admin/orders", label: "Commandes", icon: "fa-shopping-cart" },
    { path: "/admin/client", label: "Clients", icon: "fa-users" },
    { path: "/admin/settings", label: "Paramètres", icon: "fa-cog" },
  ];

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-30 md:hidden ${
          collapseShow !== "hidden" ? "block" : "hidden"
        }`}
        onClick={() => setCollapseShow("hidden")}
      ></div>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${collapseShow !== "hidden" ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Brand + Toggler */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-blue-700">
            <Link
              className="text-white text-xl font-bold flex items-center"
              to="/admin/dashboard"
            >
              <i className="fas fa-store mr-3 text-blue-300"></i>
              Supermarché Admin
            </Link>
            <button
              className="md:hidden text-white text-2xl focus:outline-none"
              onClick={() =>
                setCollapseShow(collapseShow === "hidden" ? "shown" : "hidden")
              }
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-700 text-white shadow-lg"
                          : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`}
                      to={item.path}
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i
                        className={`fas ${item.icon} w-5 text-center mr-3 ${
                          isActive ? "text-white" : "text-blue-300"
                        }`}
                      ></i>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Auth Links */}
          <div className="px-4 py-6 border-t border-blue-700">
            <ul className="space-y-2">
              <li>
                <Link
                  className="flex items-center px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
                  to="/auth/login"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-sign-in-alt w-5 text-center mr-3 text-blue-300"></i>
                  <span className="font-medium">Connexion</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
                  to="/auth/logout"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-sign-out-alt w-5 text-center mr-3 text-blue-300"></i>
                  <span className="font-medium">Déconnexion</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hamburger mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-white text-2xl bg-blue-700 p-2 rounded-md shadow-lg"
        onClick={() =>
          setCollapseShow(collapseShow === "hidden" ? "shown" : "hidden")
        }
      >
        <i className="fas fa-bars"></i>
      </button>
    </>
  );
};

export default Sidebar;
