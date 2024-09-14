import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center text-green-500 font-semibold">
            Thank you for contacting us! We will get back to you soon.
          </div>
        )}
      </div>

      <div className="mt-10 p-8 max-w-md w-full text-center bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Our Contact Details</h3>
        <p className="text-gray-700">Restaurant Name: Foodie Food</p>
        <p className="text-gray-700">Location: Solapur, Maharashtra</p>
        <p className="text-gray-700">
          Email:{" "}
          <a href="mailto:contact@foodiefood.com" className="text-blue-500">
            contact@foodiefood.com
          </a>
        </p>
        <p className="text-gray-700">Phone: +91 0987654321</p>
      </div>
    </div>
  );
};

export default Contact;
