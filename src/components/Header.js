// import { useState, useContext } from "react";
import logo from "../utils/logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

export const Header = () => {
  // const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

  // const log = () => {
  //   setBtnNameReact((prev) => (prev === "Login" ? "Logout" : "Login"));
  // };

  return (
    <header className="flex flex-col sm:flex-row   justify-between items-center bg-gradient-to-r from-green-100 to-green-200 shadow-lg p-4">
      <div className="logo-container mb-2 sm:mb-0">
        <Link to="/">
          <img
            className="w-24 sm:w-36 rounded-lg hover:opacity-90 transition-opacity duration-200"
            src={logo}
            alt="Logo"
          />
        </Link>
      </div>
      <nav className="flex flex-wrap items-center">
        <ul className="flex flex-wrap  gap-4 text-xs sm:text-sm md:text-lg font-bold">
          <li>
            <Link
              className="px-2 sm:px-4 hover:text-green-600 transition-colors duration-200"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="px-2 sm:px-4 hover:text-green-600 transition-colors duration-200"
              to="/grocery"
            >
              Grocery
            </Link>
          </li>
          <li>
            <Link
              className="px-2 sm:px-4 hover:text-green-600 transition-colors duration-200"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="px-2 sm:px-4 hover:text-green-600 transition-colors duration-200"
              to="/contact"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              className="px-2 sm:px-4 hover:text-green-600 transition-colors duration-200"
              to="/cart"
            >
              Cart - ({cartItems.length}) 🛒
            </Link>
          </li>
          {/* <li>
            <button
              className="px-2 sm:px-4 font-bold hover:text-green-600 transition-colors duration-200"
              onClick={log}
            >
              {btnNameReact}
            </button>
          </li> */}
          <li className="px-2 sm:px-4">
            Status:{" "}
            {onlineStatus ? (
              <span className="text-green-600">🟢</span>
            ) : (
              <span className="text-red-600">🔴</span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
