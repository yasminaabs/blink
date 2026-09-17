// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";


// const products = [
//   {
//     id: 1,
//     image: "/img/cover.svg",
//     name: "Classic Monochrome Tees",
//     price: "$35.00",
//   },
//   {
//     id: 2,
//     image: "/img/cover.svg",
//     name: "Monochromatic Wardrobe",
//     price: "$27.00",
//   },
//   {
//     id: 3,
//     image: "/img/cover.svg",
//     name: "Essential Neutrals",
//     price: "$22.00",
//   },
//   {
//     id: 4,
//     image: "/img/cover.svg",
//     name: "UTRAANET Black",
//     price: "$43.00",
//   },
// ];

const BestSelling = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Remplace par ton URL backend si différent
    axios.get("http://localhost:4000/api/v1/articles/getall")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      });
  }, []);


  return (
    <section className="py-12 px-6 mb-0"> 
      <div className="relative text-center max-w-6xl mx-auto mb-6">
        <h2 className="text-gray-500 text-sm tracking-wide">SHOP NOW</h2>
        <h1 className="text-3xl font-bold">Best Selling</h1>
        <a href="#" className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-black transition">
          SEE MORE &gt;
        </a>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white p-6 rounded-xl relative shadow-sm"
          >
            {/* Favorite & Other Icons */}
            <div className="absolute top-4 right-4 flex space-x-3">
              <img
                src="/img/danger.svg"
                alt="Alert"
                className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110 hover:rotate-12 hover:opacity-70"
              />
              <img
                src="/img/Heart.svg"
                alt="Favorite"
                className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110 hover:text-red-500"
              />
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover mb-4 rounded-lg"
            />

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-center">{product.name}</h3>

            {/* Price & Stock */}
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="bg-gray-200 px-3 py-1 text-xs rounded-full">IN STOCK</span>
              <span className="text-orange-500 font-semibold">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
