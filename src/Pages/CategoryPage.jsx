import React, { useState } from "react"
import { ChevronRight, X } from "lucide-react"
import { Link } from "react-router-dom"  // Import Link from react-router-dom
import products from "../data/products"

export default function SearchPage() {
  const [selectedCategories, setSelectedCategories] = useState(["Tops"])
  const [selectedSizes, setSelectedSizes] = useState(["M"])
  const [priceRange, setPriceRange] = useState([Math.min(...products.map((p) => p.price)), Math.max(...products.map((p) => p.price))])
  const [selectedColors, setSelectedColors] = useState([])

  const colors = [
    { name: "Blue", value: "bg-blue-300" },
    { name: "Yellow", value: "bg-yellow-200" },
    { name: "Green", value: "bg-green-400" },
    { name: "Purple", value: "bg-purple-500" },
  ]

  const sizes = ["S", "M", "L", "XL", "XXL"]
  const allCategories = ["Tops", "jeans", "Dresses", "Jackets", "Accessories"]

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const removeFilter = (type, value) => {
    if (type === "category") setSelectedCategories(selectedCategories.filter((c) => c !== value))
    else if (type === "size") setSelectedSizes(selectedSizes.filter((s) => s !== value))
    else if (type === "color") setSelectedColors(selectedColors.filter((c) => c !== value))
  }

  const handleMinPriceChange = (e) => {
    const newMin = Number(e.target.value);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const newMax = Number(e.target.value);
    setPriceRange([priceRange[0], newMax]);
  };

  const filteredProducts = products.filter((product) => {
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
    const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const inSize = selectedSizes.length === 0 || selectedSizes.includes(product.size)
    const inColor = selectedColors.length === 0 || selectedColors.includes(product.color)

    return inPriceRange && inCategory && inSize && inColor
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="container mx-auto flex items-center gap-2 text-sm">
          <a href="/" className="hover:underline">Blink</a>
          <ChevronRight className="h-4 w-4" />
          <span>Search</span>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="border bg-white rounded-md p-4">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label className="text-sm">{category}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full ${color.value} border-2 ${selectedColors.includes(color.name) ? "border-gray-800" : "border-gray-200"}`}
                      onClick={() => toggleColor(color.name)}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-10 h-10 flex items-center justify-center text-sm border rounded-md ${selectedSizes.includes(size) ? "border-rose-500 bg-rose-50 text-rose-500" : "border-gray-200"}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-medium mb-3">Price</h3>
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm w-12">Min:</label>
                    <input
                      type="range"
                      min={Math.min(...products.map((p) => p.price))}
                      max={Math.max(...products.map((p) => p.price))}
                      value={priceRange[0]}
                      onChange={handleMinPriceChange}
                      className="w-full"
                    />
                    <span className="text-xs">${priceRange[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm w-12">Max:</label>
                    <input
                      type="range"
                      min={Math.min(...products.map((p) => p.price))}
                      max={Math.max(...products.map((p) => p.price))}
                      value={priceRange[1]}
                      onChange={handleMaxPriceChange}
                      className="w-full"
                    />
                    <span className="text-xs">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Applied Filters */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Applied Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <div key={category} className="flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm">
                    {category}
                    <button onClick={() => removeFilter("category", category)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedSizes.map((size) => (
                  <div key={size} className="flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm">
                    Size: {size}
                    <button onClick={() => removeFilter("size", size)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedColors.map((color) => (
                  <div key={color} className="flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm">
                    Color: {color}
                    <button onClick={() => removeFilter("color", color)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} Results.
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group max-w-xs mx-auto p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gray-100 rounded-md overflow-hidden mb-3 aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-lg text-center">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-xs uppercase text-gray-500">
                      {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                    </span>
                    <span className="font-medium text-amber-500">${product.price.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
