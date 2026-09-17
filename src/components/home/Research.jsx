import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Research = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Récupération des produits à partir de l'API
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/articles/getall") // URL basée sur ton server.js
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(value.toLowerCase()) ||
      product.description?.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative flex items-center border rounded-lg px-2 py-1 w-64">
      <input
        type="text"
        placeholder="Search products"
        className="bg-transparent outline-none border-none px-2 py-1 w-full"
        value={query}
        onChange={handleSearch}
      />
      <img src="/img/Search.svg" alt="Search" className="w-5 h-5 text-gray-500 cursor-pointer" />

      {results.length > 0 && (
        <div className="absolute top-12 left-0 bg-white w-full shadow-lg rounded z-50">
          {results.map((item) => (
            <div
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleResultClick(item.id)}
            >
              <p className="font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Research;
