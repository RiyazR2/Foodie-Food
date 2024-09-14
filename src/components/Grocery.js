import React from "react";
import mockGroceryData from "../components/Mocks/mockGroceryData.json";

const Grocery = () => {
  const { groceries, vegetables } = mockGroceryData;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-green-600">
          Grocery Store
        </h1>
        <p className="text-center text-gray-600">
          Your one-stop shop for fresh produce and groceries
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold mt-20 mb-6 text-green-700">
          Vegetables
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {vegetables.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow-lg rounded-lg transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <span className="text-lg font-bold text-gray-600">
                  &#8377;{item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 mt-16 text-green-700">
          Fruits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {groceries.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow-lg rounded-lg transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <span className="text-lg font-bold text-gray-600">
                  &#8377;{item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Grocery;
