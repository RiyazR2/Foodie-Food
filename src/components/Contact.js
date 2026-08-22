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
    <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4">
      <div className="glass-card rounded-2xl shadow-2xl p-8 max-w-md w-full mb-10 animate-float-up">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Have questions? We'd love to hear from you!
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <div>
              <button type="submit" className="w-full btn-gradient">
                Send Message 📧
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-green-700 font-semibold text-lg">
              Message Sent Successfully!
            </p>
            <p className="text-green-600 text-sm mt-2">
              We'll get back to you soon.
            </p>
          </div>
        )}
      </div>

      <div className="glass-card rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-float-up">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center space-x-2">
          <span>👨‍💻</span>
          <span>Developer Info</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <span className="text-orange-600 font-bold">Name:</span>
            <span>Riyaz Pathan</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <span className="text-orange-600">💻</span>
            <a
              href="https://github.com/RiyazR2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              GitHub.com/RiyazR2
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <span className="text-orange-600">💼</span>
            <a
              href="https://www.linkedin.com/in/riyazr2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              LinkedIn.com/in/riyazr2
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <span className="text-orange-600">🌐</span>
            <a
              href="https://riyazr2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              riyazr2.vercel.app
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            💡 This is a portfolio project showcasing React, Redux & AI
            integration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
