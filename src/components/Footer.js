import React from "react";
import { Link } from "react-router-dom";
import logo from "../utils/foodieFinder_logo.png";
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
                alt="FoodieFinder AI Logo"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  FoodieFinder AI
                </h3>
                <p className="text-sm text-gray-400">AI-Powered Discovery</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Experience the future of food ordering with AI-powered
              recommendations. Discover restaurants, get personalized
              suggestions, and enjoy delicious meals!
            </p>

            {/* Developer Links */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">
                Developed by Riyaz Pathan
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/RiyazR2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700"
                title="GitHub"
              >
                <span className="text-xl">💻</span>
              </a>
              <a
                href="https://www.linkedin.com/in/riyazr2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700"
                title="LinkedIn"
              >
                <span className="text-xl">💼</span>
              </a>
              <a
                href="https://riyazr2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700"
                title="Portfolio"
              >
                <span className="text-xl">🌐</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  🛒 My Cart
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/RiyazR2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  💻 GitHub Projects
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/riyazr2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  💼 LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://riyazr2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  🌐 Portfolio Website
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              We Deliver To
            </h4>
            <ul className="space-y-2">
              {Object.entries(cities).map(([key, city]) => (
                <li
                  key={key}
                  className="text-gray-300 text-sm flex items-center space-x-2"
                >
                  <span className="text-orange-400">📍</span>
                  <span>{city.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-orange-800">
              <p className="text-xs text-gray-400 mb-1">More 🤖 AI Features</p>
              <p className="text-sm text-orange-400 font-medium">
                Coming Soon!
              </p>
            </div>
          </div>

          {/* Developer Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Developer Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-orange-400">👨‍💻</span>
                <span>Riyaz Pathan</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-orange-400">💻</span>
                <a
                  href="https://github.com/RiyazR2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors truncate"
                >
                  GitHub.com/RiyazR2
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-orange-400">💼</span>
                <a
                  href="https://www.linkedin.com/in/riyazr2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors truncate"
                >
                  LinkedIn/riyazr2
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-orange-400">🌐</span>
                <a
                  href="https://riyazr2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors truncate"
                >
                  riyazr2.vercel.app
                </a>
              </div>
            </div>

            {/* Project Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg">
              <h5 className="text-sm font-semibold mb-2">
                🤖 AI-Powered Platform
              </h5>
              <p className="text-xs text-orange-100 mb-3">
                Built with React + AI for smart discovery!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-orange-800 text-white text-xs rounded">
                  React
                </span>
                <span className="px-2 py-1 bg-orange-800 text-white text-xs rounded">
                  Redux
                </span>
                <span className="px-2 py-1 bg-orange-800 text-white text-xs rounded">
                  AI/LLM
                </span>
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
              © {currentYear} FoodieFinder AI. Built by{" "}
              <a
                href="https://riyazr2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300"
              >
                Riyaz Pathan
              </a>{" "}
              with ❤️ and AI
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <a
                href="https://github.com/RiyazR2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/riyazr2/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://riyazr2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-200"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
