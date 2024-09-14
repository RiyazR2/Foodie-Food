import UserClass from "./UserClass";
import { Component } from "react";
// import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Class Constructor");
  }

  render() {
    // console.log("Parent Class Render");
    return (
      <div className="max-w-4xl mx-auto my-10 p-4">
        <div className="text-center mb-10">
          <h1 className="font-bold text-2xl">About Us</h1>
          {/* <UserClass /> */}
        </div>
        <hr className="mb-10" />
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="mb-6">
            🚀 Thrilled to announce the successful wrap-up of Foodie Food, a web
            app designed for convenient food and grocery delivery! 🍕🛒 This
            exciting project integrates seamlessly with live Swiggy , ensuring
            real-time updates and Explore the live links and discover the key
            features that make Foodie Food a standout experience! 🌐🚀
          </p>
          <hr className="mb-6" />
          <h2 className="font-bold text-xl mb-4">🎯 Key Features:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              🌏 Real-time Swiggy API Integration: Accurate menus, availability,
              and Discount at your fingertips.
            </li>
            <li>
              🚀 Lazy Loading & Chunking: Optimal performance with faster app
              loading times.
            </li>
            <li>
              ⚡ Custom Hook: Enhanced code reusability and maintainability for
              efficient development.
            </li>
            <li>
              🔐 State Management with Redux: A centralized system for seamless
              user experiences.
            </li>
            <li>
              🔍 Search Functionality: Easily discover your favorite restaurants
              and dishes.
            </li>
            <li>
              🎯 Filtering Options: Tailor your browsing experience based on
              preferences.
            </li>
            <li>
              📌 Seamless Navigation: Explore effortlessly with React Router
              DOM.
            </li>
            <li>
              📜 Detailed Restaurant Information: Make informed choices with
              comprehensive details.
            </li>
            <li>
              ✨ Shimmer UI: Engaging loading effects for a polished user
              experience.
            </li>
            <li>
              🚧 Error 404 Page: User-friendly in case of page not found or API
              failure.
            </li>
            <li>
              📱 Responsive: Enjoy a seamless experience across various devices.
            </li>
          </ul>
          <hr className="my-6" />
          <h2 className="font-bold text-xl mb-4">🔧 Tech Stack:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>React: Powering the dynamic and interactive user interface.</li>
            <li>Parcel: Efficient bundling for streamlined development.</li>
            <li>
              Redux Toolkit: Managing application state for a scalable
              architecture.
            </li>
            <li>
              Tailwind CSS: Crafting a visually appealing and responsive design.
            </li>
            <li>
              React Router: Enabling seamless navigation within the application.
            </li>
          </ul>
        </div>
        <hr className="my-10" />
        <UserClass />
      </div>
    );
  }
}

export default About;
