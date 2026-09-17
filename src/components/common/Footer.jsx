import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-14 text-gray-600 text-sm mt-10">
      <div className="max-w-6xl mx-auto px-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo  */}
          <div className="flex-shrink-0 pr-40">
            <img src="img/blink.svg" alt="Logo" className="h-8" />
          </div>

          {/* Centered Text Sections (Closer Together) */}
          <div className="flex-1 grid grid-cols-3 gap-5 text-center md:text-left">
            {/* Support */}
            <div>
              <h3 className="text-gray-500 font-medium uppercase tracking-wide">Support</h3>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="hover:text-gray-800 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-800 transition">Terms of use</a></li>
                <li><a href="#" className="hover:text-gray-800 transition">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-gray-500 font-medium uppercase tracking-wide">Platform</h3>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="hover:text-gray-800 transition">About us</a></li>
                <li><a href="#" className="hover:text-gray-800 transition">Contact</a></li>
                <li><a href="#" className="hover:text-gray-800 transition">Careers</a></li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-gray-500 font-medium uppercase tracking-wide">Shop</h3>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="hover:text-gray-800 transition">My Account</a></li>
                <li><a href="#" className="hover:text-gray-800 transition">Checkout</a></li>
                <li><a href="#" className="hover:text-gray-800 transition">Cart</a></li>
              </ul>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col items-end pl-20">
            <h3 className="text-gray-500 font-medium uppercase tracking-wide">Accepted Payments</h3>
            <div className="flex space-x-4 mt-3">
              <img src="/img/Mastercard.svg" alt="Mastercard" className="h-5 opacity-70" />
              <img src="/img/Amex.svg" alt="Amex" className="h-5 opacity-70" />
              <img src="/img/Visa.svg" alt="Visa" className="h-5 opacity-70" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Bottom Section */}
        <p className="text-center text-gray-400">&copy; 2025 Copyright</p>
      </div>
    </footer>
  );
};

export default Footer;
