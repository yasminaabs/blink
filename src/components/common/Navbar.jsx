import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// const clothingCategories = {
//   men: ["Tops", "Jeans", "Jackets", "Accessories"],
//   women: ["Dresses", "Tops", "Skirts", "Jeans", "Jackets", "Accessories"],
//   kids: ["Boys", "Girls", "Babies"],
// };








function Navbar({ openLoginModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [clothingCategories, setCategoriesData] = useState([]);
useEffect(() => {
  axios
    .get("http://localhost:4000/api/v1/categories/with-subcategories") // adapte l’URL si besoin
    .then((res) => {
      if (res.data.success) {
        setCategoriesData(res.data.data); // [{ id, nom, sous_categories: [{ id, nom }, ...] }]
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des catégories :", err);
    });
}, []);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/articles/getall")
      .then((res) => {
        setProducts(res.data.data); // le tableau de produits est dans res.data.data
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResultClick = (id) => {
    setSearchTerm("");
    navigate(`/product/${id}`);
  };

  // Fermer le menu dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full relative">
      <div className="bg-[#B01736] text-white text-center py-2 text-sm">
        Get 25% OFF on your first order.{" "}
        <a href="#" className="underline font-medium">
          Order Now
        </a>
      </div>

      <nav className="bg-white shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16 relative">
          <div className="flex items-center space-x-2">
            <img src="/img/logo.svg" alt="Blink Logo" className="w-10 h-10" />
            <span className="text-xl font-bold tracking-wide">BLINK</span>
          </div>

          <div className="hidden md:flex space-x-6 relative">
            <a href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                Categories
                <img
                  src="/img/ChevronDown.svg"
                  alt="Dropdown"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 border top-full z-50">
                  {clothingCategories && clothingCategories.length > 0 && clothingCategories.map((cat) => (
                      <CategorySection
                        key={cat.id}  // Assurez-vous que `cat` a un `id`
                        title={cat.nom}  // Utiliser `cat.nom` pour le nom de la catégorie
                        items={Array.isArray(cat.sous_categories) ? cat.sous_categories.map((s) => s.nom) : []} // Vérifie que `sous_categories` est un tableau
                      />
                    ))}
                </div>
              )}
            </div>

            <a href="#" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Contact
            </a>
          </div>

          {/* Search & Icons */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="relative flex items-center border rounded-lg px-2 py-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products"
                className="bg-transparent outline-none border-none px-2 py-1 pr-8"
              />
              <img
                src="/img/Search.svg"
                alt="Search"
                className="absolute right-2 w-5 h-5 text-gray-500 cursor-pointer"
              />
              {searchTerm && (
                <div className="absolute top-full left-0 w-64 bg-white border rounded-lg mt-2 shadow z-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleResultClick(product.id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {product.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-10">
              <img
                src="/img/cart.svg"
                alt="Cart"
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate("/cart")}
              />
              <img
                src="/img/User.svg"
                alt="User"
                className="w-6 h-6 cursor-pointer"
                onClick={openLoginModal}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function CategorySection({ title, items }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-md">
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold text-lg">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </span>
        <img
          src="/img/ChevronRight.svg"
          alt="Expand"
          className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 gap-x-4 px-4 py-2">
          {items.map((item) => (
            <Link
              key={item}
              to={`/category/${item}`}
              className="py-1 text-sm text-gray-600 hover:text-gray-900 block"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
