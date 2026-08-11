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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b-2 border-orange-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - FoodieFinder Style */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Logo */}
              <img
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full group-hover:scale-110 transition-transform duration-200"
                src={logo}
                alt="FoodieFinder Logo"
              />
              {/* Brand Name - Compact */}
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
                  <span className="text-slate-800">Foodie</span>
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Finder
                  </span>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full">
                    AI
                  </span>
                </h1>
                <p className="text-[10px] text-gray-500 -mt-0.5 font-medium">
                  ✨ AI-Powered Restaurant Discovery
                </p>
              </div>
            </Link>
          </div>

          {/* Right Side - Home, AI Kitchen, Cart, then Location */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            {/* Home Link */}
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
            >
              🏠 Home
            </Link>

            {/* Recipe Generator Link */}
            <Link
              to="/ai-kitchen"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-1"
            >
              <span>🍳</span>
              <span>Recipe Generator</span>
            </Link>

            {/* Cart with Badge - Orange Theme */}
            <Link
              to="/cart"
              className="relative px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <span>🛒 Cart</span>
              {cartItems.length > 0 && (
                <span className="bg-white text-orange-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Location Selector - Last on Right */}
            <LocationSelector />
          </div>

          {/* Mobile Cart - Orange Theme */}
          <div className="md:hidden">
            <Link
              to="/cart"
              className="relative p-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
            >
              <span className="text-lg">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Location Selector */}
        <div className="md:hidden pb-3 pt-2 border-t border-white/30">
          <LocationSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
