import React from "react";
import { Link } from "react-router-dom";
import logo from "../utils/logo.png";
import { useLocation } from "../utils/LocationContext";

const Footer = () => {
  const { cities } = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                className="h-12 w-12 rounded-xl shadow-lg"
                src={logo}
                alt="Foodie Food Logo"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Foodie Food
                </h3>
                <p className="text-sm text-gray-400">Delicious delivered</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your favorite food delivery app bringing delicious meals from the best restaurants
              directly to your doorstep. Fast, fresh, and always satisfying.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm">
                  ℹ️ About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm">
                  📞 Contact
                </Link>
              </li>
              <li>
                <Link to="/grocery" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm">
                  🛒 Grocery
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm">
                  🛒 My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">We Deliver To</h4>
            <ul className="space-y-2">
              {Object.entries(cities).map(([key, city]) => (
                <li key={key} className="text-gray-300 text-sm flex items-center space-x-2">
                  <span className="text-green-400">📍</span>
                  <span>{city.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">📱 Download our app</p>
              <p className="text-sm text-green-400 font-medium">Coming Soon!</p>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Contact & Support</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-green-400">📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-green-400">✉️</span>
                <span>support@foodiefood.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-green-400">🕒</span>
                <span>24/7 Customer Support</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
              <h5 className="text-sm font-semibold mb-2">🍽️ Stay Updated</h5>
              <p className="text-xs text-green-100 mb-3">Get the latest offers and updates!</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-xs bg-white text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button className="px-3 py-2 bg-green-800 text-white text-xs rounded hover:bg-green-900 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Foodie Food. All rights reserved. Made with ❤️ for food lovers.
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-200">Cookie Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-200">Help Center</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
