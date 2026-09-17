import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ addToCart }) => {
  const [activeTab, setActiveTab] = useState("featured");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  // Récupère les produits en vedette
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/articles/getall")
      .then((res) => {
        if (res.data.success) {
          setFeaturedProducts(res.data.data);
        }
      })
      .catch((err) => console.error("Erreur produits en vedette :", err));
  }, []);

  // Récupère les derniers produits ajoutés
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/articles/get4New")
      .then((res) => {
        if (res.data.success) {
          setLatestProducts(res.data.data);
        }
      })
      .catch((err) => console.error("Erreur derniers produits :", err));
  }, []);

  const products = activeTab === "featured" ? featuredProducts : latestProducts;

  return (
    <div className="px-6">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center items-center relative mb-6">
          <div className="space-x-4">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeTab === "featured" ? "bg-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("featured")}
            >
              Featured
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeTab === "latest" ? "bg-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("latest")}
            >
              Latest
            </button>
          </div>
          <a href="#" className="absolute right-0 text-gray-500 text-sm hover:text-gray-700 transition">
            SEE MORE &gt;
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg text-center shadow-sm relative bg-white transition hover:shadow-md overflow-hidden"
            >
              {/* Heart Icon */}
              <div className="absolute top-3 right-3">
                <img
                  src="/img/Heart.svg"
                  alt="Favorite"
                  className="w-5 h-5 cursor-pointer transition-transform transform hover:scale-125 hover:opacity-70"
                />
              </div>

              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image || "/img/placeholder.png"} // fallback image
                  alt={product.name}
                  className="w-full h-48 object-cover mb-3"
                />

                {/* Product Info */}
                <h3 className="font-semibold mt-2 text-sm">{product.name}</h3>

                {/* Stock Badge & Price */}
                <div className="flex items-center justify-center mt-1 space-x-2 mb-4">
                  <span className="bg-gray-200 text-xs text-black px-2 py-1 rounded-full">IN STOCK</span>
                  <p className="text-orange-500 font-bold">{product.price} €</p>
                </div>
              </Link>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white py-3 flex justify-between items-center px-4 transition hover:bg-gray-800"
              >
                <span className="font-medium text-sm">Add to cart</span>
                <img src="/img/Add-to-cart.svg" alt="Cart" className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
