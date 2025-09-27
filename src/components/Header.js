// import { useState, useContext } from "react";
import logo from "../utils/logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import LocationSelector from "./LocationSelector";

export const Header = () => {
  // const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

  // const log = () => {
  //   setBtnNameReact((prev) => (prev === "Login" ? "Logout" : "Login"));
  // };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
                src={logo}
                alt="Foodie Food Logo"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Foodie Food
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Delicious delivered</p>
              </div>
            </Link>
          </div>

          {/* Location Selector - Desktop */}
          <div className="hidden md:flex flex-1 justify-center max-w-xs mx-8">
            <LocationSelector />
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              🏠 Home
            </Link>
            <Link
              to="/grocery"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              🛒 Grocery
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              ℹ️ About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              📞 Contact
            </Link>

            {/* Cart with Badge */}
            <Link
              to="/cart"
              className="relative px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 flex items-center space-x-1"
            >
              <span>🛒 Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-2">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className="text-xs text-gray-500">
                  {onlineStatus ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              <span className="text-lg">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Status */}
            <div className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          </div>
        </div>

        {/* Mobile Location Selector */}
        <div className="md:hidden pb-4 pt-2 border-t border-gray-100">
          <LocationSelector />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex flex-wrap justify-center gap-2">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 bg-gray-50"
            >
              🏠 Home
            </Link>
            <Link
              to="/grocery"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 bg-gray-50"
            >
              🛒 Grocery
            </Link>
            <Link
              to="/about"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 bg-gray-50"
            >
              ℹ️ About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 bg-gray-50"
            >
              📞 Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
