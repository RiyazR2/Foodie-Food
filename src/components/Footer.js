import React, { useEffect } from "react";
import logo from "../utils/logo.png";

const Footer = () => {
  useEffect(() => {
    //// Perform actions when the component mounts
    // console.log("Footer component mounted");
    // You can add any actions you need here
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <div className="mt-10">
      <div className="flex justify-center items-start lg:px-12 md:px-12 px-4 lg:flex-row md:flex-row flex-row bg-black lg:gap-10 md:gap-10 gap-16 lg:w-12/12 md:w-12/12 w-12/12 lg:py-5 md:py-5 py-5 pb-20 flex-wrap">
        <div className="lg:w-3/12 w-4/12 md:w-3/12 ">
          <div className="flex justify-center items-center flex-col gap-2">
            <img
              className="lg:w-32 w-16 rounded-3xl md:w-28"
              src={logo}
              alt="Logo"
            ></img>
            <span className="font-extrabold lg:text-lg md:text-lg text-base text-gray-50 tracking-wide">
              Foodie Finder
            </span>
          </div>
        </div>

        <div className="lg:w-2/12 w-4/12 md:w-2/12   lg:text-lg md:text-lg text-base text-gray-50 tracking-wide">
          <span className="font-bold">We deliver to:</span>
          <ul>
            <li>Bangalore</li>
            <li>Pune</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Solapur</li>
          </ul>
        </div>
      </div>
      <div className="bg-zinc-800 text-white text-center py-2">
        <span className="tracking-wide">
          &copy; 2024 Foodie Food. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
