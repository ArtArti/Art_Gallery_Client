import { MenuIcon, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ userType, setUserType, cart }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/upload", label: "Upload Art" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and desktop nav */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <svg
                width="260"
                height="80"
                viewBox="0 0 260 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Palette shape */}
                <path
                  d="M60 40c0-20 20-30 40-30s40 10 40 30-20 30-30 30c-5 0-10-5-10-10s5-10 0-10-10 5-15 5c-10 0-25-5-25-15z"
                  fill="#f59e0b"
                />
                {/* Thumb hole */}
                <circle cx="110" cy="40" r="5" fill="white" />

                {/* Logo Text */}
                <text
                  x="130"
                  y="50"
                  fontFamily="Arial, sans-serif"
                  fontSize="26"
                  fontWeight="bold"
                  fill="black"
                >
                  Art
                </text>
                <text
                  x="158"
                  y="50"
                  fontFamily="Arial, sans-serif"
                  fontSize="26"
                  fontWeight="bold"
                  fill="#000000"
                >
                  _Gallery
                </text>
              </svg>
            </h1>

            {/* Nav links for large screens */}
            <nav className="hidden lg:flex ml-8 space-x-4">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === to
                      ? " bg-amber-500 text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="cart"
              className="relative p-2  text-amber-600 hover:text-gray-900"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/auth" className="flex items-center space-x-2 border border-amber-600 rounded-md p-1">
              <User size={20} className="text-amber-600 " />
              <span className="text-sm text-amber-600">Profile</span>
            </Link>

            {/* Hamburger for mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle Sidebar"
                className="p-2 focus:outline-none"
              >
                <MenuIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar menu (mobile only) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 z-50 flex">
          <div className="w-64 bg-white shadow-lg h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close Menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`text-left text-gray-700 hover:text-orange-600 ${
                    location.pathname === to ? "font-semibold" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setSidebarOpen(false)}
                className="text-left text-gray-700 hover:text-orange-600"
              >
                Cart
              </Link>
            </nav>
          </div>
          {/* Clicking outside closes the sidebar */}
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
}
