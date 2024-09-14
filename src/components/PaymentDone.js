import React from "react";
import { Link } from "react-router-dom";

const PaymentDone = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full text-center">
        <div className="text-green-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed
          successfully.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentDone;
