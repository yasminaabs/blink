import React from "react";

const News = () => {
  return (
    <div className="bg-orange-50 py-14 px-6 mt-16 mb-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-800">📩 Join Our Newsletter</h2>
          <p className="text-gray-600 text-sm mt-1">
            We love to surprise our subscribers with occasional gifts.
          </p>
        </div>

        {/* Input & Button Section */}
        <div className="relative w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full md:w-80 px-5 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-400 outline-none transition"
          />
          <button className="absolute right-1 top-1 bottom-1 px-6 bg-orange-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-orange-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
