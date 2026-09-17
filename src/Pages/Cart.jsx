import React, { useState } from "react";

function CartPage({ cartItems: initialItems }) {
  const [cartItems, setCartItems] = useState(initialItems);

  // Calculate total price
  const total = cartItems
    .reduce(
      (acc, item) =>
        acc + parseFloat(item.price.replace("$", "")) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  // Handle quantity change
  const changeQuantity = (index, delta) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) + delta),
            }
          : item
      )
    );
  };

  // Handle item removal
  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <span className="text-[#B01736] font-semibold">Blink</span> &gt;{" "}
        <span className="text-gray-700">Cart</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      {/* Cart Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">My cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-gray-500 text-center py-20 border rounded-md">
              Your cart is currently empty.
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border text-sm"
                >
                  {/* Image & info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <div className="flex items-center text-gray-500 gap-2 mt-1 text-xs">
                        <span>Color:</span>
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{
                            backgroundColor: item.selectedColor || "#ccc", // Display selected color
                          }}
                        ></span>
                        <span>—</span>
                        <span>Size: {item.selectedSize || "M"}</span> {/* Display selected size */}
                      </div>
                    </div>
                  </div>

                  {/* Price & Quantity */}
                  <div className="flex items-center gap-6">
                    <p className="text-gray-800 font-medium">
                      $
                      {(
                        parseFloat(item.price.replace("$", "")) *
                        (item.quantity || 1)
                      ).toFixed(2)}
                    </p>

                    <div className="flex items-center border rounded-md px-2 py-1 gap-3">
                      <button
                        onClick={() => changeQuantity(index, -1)}
                        className="text-gray-500 hover:text-gray-800 text-lg"
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantity || 1}</span>
                      <button
                        onClick={() => changeQuantity(index, 1)}
                        className="text-gray-500 hover:text-gray-800 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-gray-400 hover:text-gray-700 text-lg"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border rounded-md p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-4">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-md border-t pt-4 mb-6">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="w-full bg-[#B01736] text-white py-2 rounded-md hover:bg-[#9e1430] transition">
              Checkout
            </button>
            <button
              onClick={() => setCartItems([])}
              className="block text-center text-sm text-gray-500 mt-4 underline hover:text-gray-700"
            >
              RESET CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
