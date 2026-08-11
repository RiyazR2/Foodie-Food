import React from "react";
import { Link } from "react-router-dom";

const PaymentDone = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Success Card */}
      <div className="glass-card rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-float-up">
        {/* Success Icon */}
        <div className="mb-6 relative">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-green-100 animate-ping opacity-20"></div>
          </div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Successful! 🎉
        </h2>
        <p className="text-gray-600 mb-2">Thank you for your order!</p>
        <p className="text-sm text-gray-500 mb-8">
          Your payment has been processed successfully.
          <br />
          Your delicious food is on its way! 🍽️
        </p>

        {/* Order Details */}
        <div className="bg-orange-50 rounded-xl p-4 mb-8 border border-orange-100">
          <div className="flex items-center justify-center space-x-2 text-orange-600 mb-2">
            <span className="text-2xl">⏱️</span>
            <span className="font-bold">Estimated Delivery</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">30-40 mins</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/" className="block btn-gradient w-full">
            <span className="flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span>Back to Home</span>
            </span>
          </Link>
          <button
            onClick={() => window.print()}
            className="w-full px-6 py-3 rounded-full bg-white border-2 border-orange-200 text-orange-600 font-bold hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🧾</span>
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Thank You Note */}
      <p className="mt-8 text-gray-600 text-sm">
        Powered by{" "}
        <span className="font-bold gradient-text">FoodieFinder AI</span>
      </p>
    </div>
  );
};

export default PaymentDone;
