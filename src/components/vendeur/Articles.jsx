import AddProductForm from "../modal/AddProduct"
import { useState } from "react"
import { Eye } from "lucide-react"
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useEffect } from "react"
import axios from "axios"


export default function Products() {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null);

    const handleEditProduct = (updatedProduct) => {
        setProducts(products.map(p => 
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        ));
        setEditingProduct(null);
      };

      
    const handleAddProduct = (productData) => {
        const newProduct = {
          ...productData,
          id: products.length + 1,
          status: productData.stock > 0 ? "active" : "out_of_stock"
        }
        setProducts([...products, newProduct])
        setIsAddProductOpen(false)
      }
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     name: "T-shirt Premium",
  //     description: "T-shirt en coton bio de haute qualité",
  //     price: 29.99,
  //     stock: 45,
  //     category: "Vêtements",
  //     status: "active",
  //   },
  //   {
  //       id: 5,
  //       name: "T-shirt Premium",
  //       description: "T-shirt en coton bio de haute qualité",
  //       price: 29.99,
  //       stock: 45,
  //       category: "Vêtements",
  //       status: "active",
  //     },
  //     {
  //       id: 4,
  //       name: "T-shirt Premium",
  //       description: "T-shirt en coton bio de haute qualité",
  //       price: 29.99,
  //       stock: 0,
  //       category: "Vêtements",
  //       status: "active",
  //     },
  //     {
  //       id: 2,
  //       name: "T-shirt Premium",
  //       description: "T-shirt en coton bio de haute qualité",
  //       price: 29.99,
  //       stock: 45,
  //       category: "Accessoire",
  //       status: "active",
  //     },
  //     {
  //       id: 3,
  //       name: "T-shirt Premium",
  //       description: "T-shirt en coton bio de haute qualité",
  //       price: 29.99,
  //       stock: 0,
  //       category: "Chaussures",
  //       status: "active",
  //     },
   
  // ])
  const [products, setProducts] = useState([]); // au lieu de [...] avec des objets
  const [sousCategories, setSousCategories] = useState([]);


  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Vêtements",
  })
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(null)

  const handleDeleteProduct = () => {
    setProducts(products.filter(product => product.id !== currentProduct.id))
    setIsDeleteProductOpen(false)
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "in_stock" && product.stock > 0) ||
      (statusFilter === "out_of_stock" && product.stock <= 0)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesStatus && matchesSearch
  })


  const vendorId =2 // <-- remplace dynamiquement selon ton cas

  useEffect(() => {
  axios
    .get(`http://localhost:4000/api/v1/articles/getAV/${vendorId}`)
    .then((response) => {
      setProducts(response.data.articles); // pas response.data
    })
    .catch((error) => {
      console.error('Erreur de chargement des articles :', error);
    });
}, []);

useEffect(() => {
  axios
    .get(`http://localhost:4000/api/v1/categories/getNomSC`)
    .then((res) => setSousCategories(res.data.data)) // ← ici on accède à "data"
    .catch((err) => console.error("Erreur de chargement des catégories :", err))
}, [])



  return (
    <div className="space-y-6 p-4">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Produits</h1>
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="flex items-center gap-2 bg-[#fcb63d] hover:bg-[#FAA61A] cursor-pointer text-white px-4 py-2 rounded-md"
        >
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="pl-10 w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:outline-none focus:ring-[#FAA61A] "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 dropdown-content " >
          {/* <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-200 rounded-md w-40 hover:bg-gray-100 focus:bg-gray-100"
          >
            <option  value="Vêtements">Vêtements</option>
            <option  value="Chaussures">Chaussures</option>
            <option  value="Accessoires">Accessoires</option>
          </select> */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-200 rounded-md w-40"
          >
            <option value="all">Toutes catégories</option>
            { sousCategories.map((categorie, index) => (
                <option key={index} value={categorie.nom}>
                  {categorie.nom}
                </option>
              )) }
          </select>


          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-200 rounded-md w-40"
          >
            <option value="all">Tous statuts</option>
            <option value="in_stock">En stock</option>
            <option value="out_of_stock">Rupture</option>
          </select>
        </div>
      </div>

      {/* Tableau des produits */}
      <div className="overflow-x-auto relative">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["ID", "Nom", "Catégorie", "Prix", "Stock", "Statut", "Actions"].map((header, index) => (
                <th key={index} className="text-left p-3 font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="border-b  border-gray-100 hover:bg-gray-50">
                <td className="p-3">{product.id}</td>
                <td className="p-3">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                </td>
                <td className="p-3">{product.category}</td>
                {/* <td className="p-3">{product.price.toFixed(2)}€</td> */}
                <td className="p-3">{Number(product.price).toFixed(2)}€</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 0 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.stock > 0 ? "En stock" : "Rupture"}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(isDropdownOpen === product.id ? null : product.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    
                    {isDropdownOpen === product.id && (
                      <div className="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded-md shadow-lg ">
                        <div className="py-1">
                          <button 
                            onClick={() => {
                                setEditingProduct(product);
                                setIsDropdownOpen(null);
                              }}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              setCurrentProduct(product)
                              setIsDeleteProductOpen(true)
                              setIsDropdownOpen(null)
                            }}
                            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale d'ajout */}
      {(isAddProductOpen || editingProduct) && (
      <div
      
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }}>
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}>
          <AddProductForm
            product={editingProduct}
            onClose={() => {
              setIsAddProductOpen(false);
              setEditingProduct(null);
            }}
            onSave={(productData) => {
              if (editingProduct) {
                handleEditProduct({ ...productData, id: editingProduct.id });
              } else {
                handleAddProduct(productData);
              }
            }}
          />
        </div>
      </div>
    )}
      {/* Modale de suppression */}
      {isDeleteProductOpen && (
        <div 
        style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
          }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Supprimer le produit</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer "{currentProduct?.name}" ?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteProductOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}