import React, { useState } from "react";
import { useParams } from "react-router-dom";
import News from "../components/home/News";
import ReportModal from "../components/common/ReportModal";
import products from "../data/products";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#1e293b");
  const [isReportOpen, setIsReportOpen] = useState(false);

  if (!product)
    return (
      <div className="text-center py-20 text-xl">Product not found</div>
    );

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addToCart({ ...product, selectedSize, selectedColor, quantity });
  };

  return (
    <div className="pt-20 pb-32 px-6 lg:px-0 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* TOP SECTION: Image + Info */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image + Carousel */}
          <div>
            <div className="bg-gray-100 p-10 rounded-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto object-contain h-[400px]"
              />
              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4].map((dot, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === 0 ? "bg-gray-800" : "bg-gray-400"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">{product.name}</h1>

            {/* Rating + Stock */}
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm gap-1 text-gray-600">
                <span>⭐</span>
                <span>4.2</span>
                <span className="text-gray-400">—</span>
                <span className="underline">54 Reviews</span>
              </div>
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                IN STOCK
              </span>
            </div>

            {/* Price */}
            <p className="text-[#f59e0b] font-semibold text-lg">${product.price.toFixed(2)}</p>

            {/* Color Options */}
            <div>
              <label className="block text-sm font-medium mb-1">Available Colors</label>
              <div className="flex gap-3">
                {["#1e293b", "#facc15", "#86efac"].map((color, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition ${
                      selectedColor === color ? "border-black scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div>
              <label className="block text-sm font-medium mb-1">Select Size</label>
              <div className="flex gap-2">
                {["S", "M", "X", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-1 rounded text-sm font-medium transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <div className="flex items-center border w-fit rounded overflow-hidden">
                <button
                  className="px-3 py-1 text-lg font-semibold text-gray-600"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 text-lg font-semibold text-gray-600"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-2 items-center">
              <button
                onClick={handleAddToCart}
                className="bg-[#be123c] text-white px-6 py-2 rounded hover:bg-rose-700 transition"
              >
                Add to cart
              </button>
              <button className="w-10 h-10 border rounded flex items-center justify-center text-gray-500 hover:text-black transition">
                <img src="/img/Heart.svg" alt="heart" />
              </button>
              <button
                onClick={() => setIsReportOpen(true)}
                className="w-10 h-10 border rounded flex items-center justify-center text-gray-500 hover:text-red-600 transition"
                title="Signaler cet article"
              >
                <img src="/img/danger.svg" alt="signaler" />
              </button>
            </div>

            <p className="text-sm text-gray-500">— FREE SHIPPING ON ORDERS $100+</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-20 max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Detail</h2>
          <p className="text-gray-600 text-sm mb-4">
            Elevate your everyday style with our Men’s Black T-Shirts, the ultimate wardrobe essential for modern men. Crafted with meticulous attention to detail and designed for comfort, these versatile black tees are a must-have addition to your collection.
          </p>
          <p className="text-gray-600 text-sm mb-4">
            The classic black color never goes out of style. Whether you're dressing up for a special occasion or keeping it casual, these black t-shirts are the perfect choice, effortlessly complementing any outfit.
          </p>
          <ul className="list-disc list-inside text-gray-500 mt-3 space-y-1 text-sm">
            <li>Premium Quality</li>
            <li>Versatile Wardrobe Staple</li>
            <li>Available in Various Sizes</li>
            <li>Tailored Fit</li>
          </ul>
        </div>

        {/* SUGGESTED PRODUCTS */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-6">You might also like</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .map((p) => (
                <div key={p.id} className="p-4 border rounded-lg hover:shadow transition">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h4 className="text-sm font-medium">{p.name}</h4>
                  <p className="text-orange-500 text-sm">${p.price.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="w-full mt-24">
          <News />
        </div>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        articleName={product.name}
      />
    </div>
  );
};

export default ProductDetail;
