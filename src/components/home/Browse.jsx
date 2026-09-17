import React from "react";

const Browse = () => {
  return (
    <div
      className="w-full h-[400px] bg-contain bg-left bg-no-repeat flex items-center pl-20 pt-0 mt-0 mb-16" 
      style={{ backgroundImage: "url('/img/categories.svg')" }} 
    >
      <div className="max-w-md p-10 m-20">
        <h2 className="text-2xl font-bold text-black">
          Browse Our Fashion Paradise!
        </h2>
        <p className="text-gray-700 mt-2">
          Step into a world of style and explore our diverse collection of
          clothing categories.
        </p>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 flex items-center rounded hover:bg-orange-600 transition">
          Start Browsing 
          <span className="ml-2">{<img src="/img/arrow.svg" alt="Arrow icon" />}</span>
        </button>
      </div>
    </div>
  );
};

export default Browse;
