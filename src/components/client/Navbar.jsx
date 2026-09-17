import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import name from '../../assets/name.svg';
import user from '../../assets/User.svg';
import panier from '../../assets/panier.svg'
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
   
  };

 
  const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="8" strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const ShoppingBagIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="2"/>
      <path d="M3 6h18" strokeWidth="2"/>
      <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2"/>
    </svg>
  );


  return (
    <header className="border-b border-gray-200 py-3 px-30">
      <div className="container  flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
           <img src={name} alt="" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                onClick={() => setShowCategories(!showCategories)}
                onMouseLeave={() => setShowCategories(false)}
              >
                Categories
                <ChevronDownIcon />
              </button>
              {showCategories && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-200"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                    T-shirts
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                    Vestes
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                    Pantalons
                  </Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                    Robes
                  </Link>
                </div>
              )}
            </div>
            <Link to="#" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="#" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search products"
              className="border-gray-300 border rounded-md pl-10 pr-4 py-1 w-[200px] sm:w-[250px] focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link to="#" className="text-gray-700 hover:text-gray-900">
          <img src={panier} alt="" />
          </Link>
          <Link to="#" className="text-gray-700 hover:text-gray-900">
            <img src={user} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;