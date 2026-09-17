import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="mt-16 border-t pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center">
                <div className="bg-orange-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-md mr-2">
                  <span>B</span>
                </div>
                <span className="text-xl font-bold">BLINK</span>
              </div>
            </Link>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-sm tracking-wider">SUPPORT</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-sm tracking-wider">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  About us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-sm tracking-wider">SHOP</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  Checkout
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#c41c4e]">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-gray-500 font-medium mb-4 uppercase text-sm tracking-wider">ACCEPTED PAYMENTS</h3>
              <div className="flex space-x-4">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <img src="/placeholder.svg?height=24&width=36" alt="Mastercard" width={36} height={24} />
                </div>
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <img src="/placeholder.svg?height=24&width=36" alt="American Express" width={36} height={24} />
                </div>
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <img src="/placeholder.svg?height=24&width=36" alt="Visa" width={36} height={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} BLINK. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;