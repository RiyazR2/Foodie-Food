import React from "react";
import { Link } from "react-router-dom";
import UserClass from "./UserClass";
import { useLocation } from "../utils/LocationContext";

const About = () => {
  const { cities } = useLocation();
  const cityCount = Object.keys(cities).length;

  const features = [
    {
      icon: "📍",
      title: "Multi-City Support",
      description: `Available in ${cityCount} major cities with location-based restaurant discovery`,
      highlight: "NEW"
    },
    {
      icon: "🎯",
      title: "Geolocation Integration",
      description: "Use your current location for precise restaurant recommendations",
      highlight: "NEW"
    },
    {
      icon: "🌏",
      title: "Real-time API Integration",
      description: "Live restaurant data, menus, and availability updates",
      highlight: ""
    },
    {
      icon: "🚀",
      title: "Performance Optimized",
      description: "Lazy loading, code splitting, and optimized bundle size",
      highlight: ""
    },
    {
      icon: "🔐",
      title: "Redux State Management",
      description: "Centralized state management for seamless user experience",
      highlight: ""
    },
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Search by restaurant name, cuisine type, or dish",
      highlight: ""
    },
    {
      icon: "🎨",
      title: "Modern UI/UX",
      description: "Beautiful, responsive design with smooth animations",
      highlight: ""
    },
    {
      icon: "⚡",
      title: "Fast & Reliable",
      description: "Optimized performance with error handling and fallbacks",
      highlight: ""
    }
  ];

  const techStack = [
    { name: "React 18", description: "Modern React with hooks and concurrent features", color: "bg-blue-500" },
    { name: "Redux Toolkit", description: "Efficient state management", color: "bg-purple-500" },
    { name: "React Router", description: "Client-side routing and navigation", color: "bg-red-500" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework", color: "bg-cyan-500" },
    { name: "Parcel", description: "Zero-configuration build tool", color: "bg-orange-500" },
    { name: "Context API", description: "Location state management", color: "bg-green-500" }
  ];

  const stats = [
    { number: cityCount, label: "Cities Covered", icon: "🏙️" },
    { number: "1000+", label: "Restaurants", icon: "🍽️" },
    { number: "24/7", label: "Service", icon: "🕒" },
    { number: "100%", label: "Responsive", icon: "📱" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-300">Foodie Food</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Your favorite food delivery platform, now with dynamic location support
              and real-time restaurant discovery across multiple cities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                🏠 Explore Restaurants
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                📞 Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To revolutionize food delivery by providing a seamless, location-aware platform
              that connects food lovers with their favorite restaurants across multiple cities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Precision</h3>
              <p className="text-gray-600">
                Accurate location-based recommendations ensuring you find the perfect meal nearby.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Speed</h3>
              <p className="text-gray-600">
                Lightning-fast app performance with real-time updates and instant search results.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Experience</h3>
              <p className="text-gray-600">
                Delightful user experience with modern design and intuitive navigation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🚀 Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes Foodie Food the ultimate food delivery experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {feature.highlight && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {feature.highlight}
                  </div>
                )}
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🔧 Tech Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies for optimal performance and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-12 h-12 ${tech.color} rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4`}>
                  {tech.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{tech.name}</h3>
                  <p className="text-gray-600 text-sm">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Coverage */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🌍 Where We Serve
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Currently available in {cityCount} major cities with plans to expand nationwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(cities).map(([key, city]) => (
              <div key={key} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-semibold">{city.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-green-100 mb-4">Don't see your city? We're expanding fast!</p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
            >
              Request Your City
            </Link>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              👨‍💻 Meet the Developer
            </h2>
            <p className="text-xl text-gray-600">
              Passionate about creating amazing user experiences
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <UserClass />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order? 🍽️
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Discover amazing restaurants in your area and get your favorite food delivered fast!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              🏠 Start Ordering Now
            </Link>
            <Link
              to="/grocery"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 text-lg"
            >
              🛒 Browse Grocery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
