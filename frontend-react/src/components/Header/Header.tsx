import React, { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  cartCount?: number;
  navLinks?: NavLink[];
}

const defaultNavLinks: NavLink[] = [
  { label: "Accueil", href: "#" },
  { label: "Fruits & Légumes", href: "#" },
  { label: "Viandes & Poissons", href: "#" },
  { label: "Produits Laitiers", href: "#" },
  { label: "Boulangerie", href: "#" },
  { label: "Boissons", href: "#" },
  { label: "Promotions", href: "#" },
];

const Header: React.FC<HeaderProps> = ({ cartCount = 0, navLinks = defaultNavLinks }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary flex items-center justify-between w-full md:w-auto">
            <span>
              Market<span className="text-secondary">Plus</span>
            </span>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 w-full max-w-2xl order-3 md:order-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-accent">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-6 order-2 md:order-3">
            <div className="flex flex-col items-center cursor-pointer">
              <i className="fas fa-user text-gray-600"></i>
              <span className="text-xs text-gray-600">Compte</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer relative">
              <i className="fas fa-shopping-cart text-gray-600"></i>
              <span className="text-xs text-gray-600">Panier</span>
              {cartCount > 0 && (
                <div className="absolute cart-count bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -top-1 -right-1">
                  {cartCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-primary">
          <div className="container mx-auto px-4">
            {/* Desktop menu */}
            <ul className="hidden md:flex flex-wrap justify-center space-x-6 text-white py-3">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <ul className="flex flex-col md:hidden text-white py-3 space-y-2">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="block px-4 py-2 hover:bg-primary/80 rounded">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;