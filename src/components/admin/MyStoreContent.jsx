import { useState } from "react";
import { useEffect, useRef } from 'react';
import AddProductForm from '../modal/AddProduct';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  MoreHorizontal, 
  Search, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  ChevronDown,
  Check,
  Printer
} from "lucide-react";

export default function MyStoreContent() {
     // Références
  const productModalRef = useRef(null);
  const orderModalRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
const dropdownRefs = useRef({});




   // Effet pour le modal Produit
   useEffect(() => {
    const handleProductModalClick = (e) => {
      if (productModalRef.current && !productModalRef.current.contains(e.target)) {
        setIsDialogOpen(false);
      }
    };
    document.addEventListener("mousedown", handleProductModalClick);
    return () => document.removeEventListener("mousedown", handleProductModalClick);
  }, []);
   // Effet pour le modal Commande
   useEffect(() => {
    const handleOrderModalClick = (e) => {
      if (orderModalRef.current && !orderModalRef.current.contains(e.target)) {
        setIsOrderDetailsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOrderModalClick);
    return () => document.removeEventListener("mousedown", handleOrderModalClick);
  }, []);

  // Gestion centralisée des clics extérieurs
useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer tous les dropdowns si le clic est à l'extérieur
      const shouldCloseAll = Object.values(dropdownRefs.current).every(
        ref => ref && !ref.contains(event.target)
      );
  
      if (shouldCloseAll) {
        setDropdownOpen(null);
        setSelectOpen(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic Monochrome Tees",
      price: 29.99,
      stock: 120,
      category: "T-shirts",
      status: "En vente",
      images: [],
      colors: [], 
      sizes: [
        { id: "1", label: "S", selected: false },
        { id: "2", label: "M", selected: false },
        { id: "3", label: "L", selected: false },
        { id: "4", label: "XL", selected: false },
        { id: "5", label: "XXL", selected: false },
      ],
    },
    {
      id: 2,
      name: "Monochromatic Wardrobe",
      price: 89.99,
      stock: 45,
      category: "Ensembles",
      status: "En vente",
      images: [],
      colors: [], 
      sizes: [
        { id: "1", label: "S", selected: false },
        { id: "2", label: "M", selected: false },
        { id: "3", label: "L", selected: false },
        { id: "4", label: "XL", selected: false },
        { id: "5", label: "XXL", selected: false },
      ],
    },
    {
      id: 3,
      name: "Essential Neutrals",
      price: 39.99,
      stock: 78,
      category: "Basics",
      status: "En vente",
      images: [],
      colors: [], 
      sizes: [
        { id: "1", label: "S", selected: false },
        { id: "2", label: "M", selected: false },
        { id: "3", label: "L", selected: false },
        { id: "4", label: "XL", selected: false },
        { id: "5", label: "XXL", selected: false },
      ],
    },
    {
      id: 4,
      name: "Sleek and Cozy Black",
      price: 59.99,
      stock: 32,
      category: "Sweats",
      status: "En vente",
      images: [],
      colors: [
        { id: "1", name: "Noir", hex: "#000000", selected: true },
        { id: "2", name: "Blanc", hex: "#FFFFFF", selected: false },
      ], 
      sizes: [
        { id: "1", label: "S", selected: true },
        { id: "2", label: "M", selected: false },
        { id: "3", label: "L", selected: false },
        { id: "4", label: "XL", selected: false },
        { id: "5", label: "XXL", selected: false },
      ],
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD-2023-001",
      customer: "Jean Dupont",
      email: "jean.dupont@example.com",
      date: "20 Mar, 2023",
      total: 89.97,
      status: "En cours",
      items: [
        { id: 1, name: "Classic Monochrome Tees", quantity: 2, price: 29.99 },
        { id: 3, name: "Essential Neutrals", quantity: 1, price: 39.99 },
      ],
      address: "123 Rue de Paris, 75001 Paris, France",
      payment: "Carte bancaire",
    },
    {
      id: "ORD-2023-002",
      customer: "Marie Martin",
      email: "marie.martin@example.com",
      date: "18 Mar, 2023",
      total: 149.98,
      status: "Expédié",
      items: [
        { id: 2, name: "Monochromatic Wardrobe", quantity: 1, price: 89.99 },
        { id: 4, name: "Sleek and Cozy Black", quantity: 1, price: 59.99 },
      ],
      address: "45 Avenue des Champs-Élysées, 75008 Paris, France",
      payment: "PayPal",
    },
    {
      id: "ORD-2023-003",
      customer: "Lucas Bernard",
      email: "lucas.bernard@example.com",
      date: "15 Mar, 2023",
      total: 119.97,
      status: "Livré",
      items: [
        { id: 1, name: "Classic Monochrome Tees", quantity: 1, price: 29.99 },
        { id: 2, name: "Monochromatic Wardrobe", quantity: 1, price: 89.99 },
      ],
      address: "78 Boulevard Saint-Michel, 75006 Paris, France",
      payment: "Carte bancaire",
    },
    {
      id: "ORD-2023-004",
      customer: "Sophie Petit",
      email: "sophie.petit@example.com",
      date: "12 Mar, 2023",
      total: 59.99,
      status: "Livré",
      items: [{ id: 4, name: "Sleek and Cozy Black", quantity: 1, price: 59.99 }],
      address: "22 Rue de Rivoli, 75004 Paris, France",
      payment: "Carte bancaire",
    },
    {
      id: "ORD-2023-005",
      customer: "Thomas Leroy",
      email: "thomas.leroy@example.com",
      date: "10 Mar, 2023",
      total: 179.97,
      status: "Livré",
      items: [{ id: 2, name: "Monochromatic Wardrobe", quantity: 2, price: 89.99 }],
      address: "5 Place de la République, 75003 Paris, France",
      payment: "PayPal",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    status: "En vente",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [selectOpen, setSelectOpen] = useState(null);

  const [productSearchTerm, setProductSearchTerm] = useState("");
const [orderSearchTerm, setOrderSearchTerm] = useState("");



  const handleAddProduct = () => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...newProduct, id: p.id } : p)));
    } else {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: products.length + 1,
        },
      ]);
    }

    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      status: "En vente",
    });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEditProduct = (product) => {
    const productWithDefaults = {
      ...product,
      sizes: product.sizes || [
        { id: "1", label: "S", selected: false },
        { id: "2", label: "M", selected: false },
        { id: "3", label: "L", selected: false },
        { id: "4", label: "XL", selected: false },
        { id: "5", label: "XXL", selected: false },
      ],
      colors: product.colors || [],
      images: product.images || [],
    };
  
    setEditingProduct(productWithDefaults);
    setIsDialogOpen(true);
  };
  
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    setIsOrderDetailsOpen(false);
  };

// Filtre combiné pour les produits (recherche + statut)
const filteredProducts = products
  .filter(product => {
    const searchTerm = productSearchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.price.toString().includes(productSearchTerm)
    );
  })
  .map(product => ({
    ...product,
    status: product.stock <= 0 ? "Rupture de stock" : "En stock"
  }));

// Filtre combiné pour les commandes (recherche + statut)
const filteredOrders = orders
  .filter(order => {
    const searchTerm = orderSearchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm) ||
      order.total.toString().includes(orderSearchTerm) ||
      order.status.toLowerCase().includes(searchTerm)
    );
  })
  .filter(order => {
    if (orderStatusFilter === "all") return true;
    if (orderStatusFilter === "processing") return order.status === "En cours de traitement";
    if (orderStatusFilter === "shipped") return order.status === "Expédié";
    if (orderStatusFilter === "delivered") return order.status === "Livré";
    return true;
  });

  // Statistics for dashboard
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "En cours").length;
  const totalProducts = products.length;

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const toggleSelect = (id) => {
    setSelectOpen(selectOpen === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-800";
      case "Expédié":
        return "bg-blue-100 text-blue-800";
      case "En cours":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    
    
    <div className="min-h-screen rounded-lg border border-gray-200 bg-white p-6 ">
{/******************************************************** Header*******************************************************************/}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Ma Boutique</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Ajouter un produit
          </button>
        </div>

{/******************************************************** Tabs*******************************************************************/}
{/********************************************************Buttons*******************************************************************/}
        <div className="bg-gray-100 rounded-lg ">
          <div className="grid grid-cols-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center gap-2 py-1 px-4 ${activeTab === "dashboard" ? "text-black  bg-white m-1" : "text-gray-500 hover:text-gray-700"}`}
            >
              <BarChart3 size={16} />
              <span>Tableau de bord</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center justify-center gap-2 py-1  px-4 ${activeTab === "products" ? "text-black  bg-white m-1"  : "text-gray-500 hover:text-gray-700"}`}
            >
              <Package size={16} />
              <span>Produits</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center justify-center gap-2 py-1 px-4 ${activeTab === "orders" ?  "text-black  bg-white m-1"  : "text-gray-500 hover:text-gray-700"}`}
            >
              <ShoppingCart size={16} />
              <span>Commandes</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center justify-center gap-2  py-1 px-4 ${activeTab === "settings" ?  "text-black  bg-white m-1"  : "text-gray-500 hover:text-gray-700"}`}
            >
              <Settings size={16} />
              <span>Paramètres</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
              {/* Stats Cards */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 ">Revenu total</h3>
                <p className="text-2xl font-bold mt-1">{totalRevenue.toFixed(2)} €</p>
                <p className="text-xs text-gray-400 mt-1">+12% par rapport au mois dernier</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Commandes</h3>
                <p className="text-2xl font-bold mt-1">{totalOrders}</p>
                <p className="text-xs text-gray-400 mt-1">+8% par rapport au mois dernier</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Commandes en attente</h3>
                <p className="text-2xl font-bold mt-1">{pendingOrders}</p>
                <p className="text-xs text-gray-400 mt-1">-5% par rapport au mois dernier</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Produits</h3>
                <p className="text-2xl font-bold mt-1">{totalProducts}</p>
                <p className="text-xs text-gray-400 mt-1">+2 nouveaux produits</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Sales */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium text-lg">Ventes récentes</h3>
                <p className="text-gray-500 text-sm mb-4">Les 5 dernières commandes</p>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total.toFixed(2)} €</p>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium mt-1 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Products */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium text-lg">Produits populaires</h3>
                <p className="text-gray-500 text-sm mb-4">Les produits les plus vendus</p>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.price.toFixed(2)} €</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

 {/************************************************************************************ Products Tab **********************************************************************************************************/}
 {activeTab === "products" && (
  <div className="bg-white rounded-lg border border-gray-200 px-3 overflow-hidden">
    <div className="flex items-center justify-between p-6">
      <h3 className="text-lg font-medium text-gray-800">Mes Produits</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
    type="text"
    placeholder="Rechercher un produit..."
    className="pl-9 pr-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-[#FAA61A] focus:border-transparent"
    value={productSearchTerm}
    onChange={(e) => setProductSearchTerm(e.target.value)}
  />
      </div>
    </div>

    {filteredProducts.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-sm font-medium text-gray-500">
              <th className="px-6 py-3">Nom du produit</th>
              <th className="px-6 py-3">Prix</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Catégorie</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4">{product.price.toFixed(2)} €</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    product.stock <= 0 
                      ? "bg-red-100 text-red-800" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {product.stock <= 0 ? "En rupture" : "En stock"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
  <div className="relative inline-block text-left">
    <button
      onClick={(e) => {
        e.stopPropagation(); // Empêche la propagation du clic
        toggleDropdown(product.id);
      }}
      className="p-1 rounded-sm hover:bg-gray-100 focus:outline-none"
    >
      <MoreHorizontal className="h-4 w-4" />
    </button>
    
    {dropdownOpen === product.id && (
      <div
        ref={el => dropdownRefs.current[product.id] = el}
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
      >
        <div className="py-1">
          <button
            onClick={() => {
              handleEditProduct(product);
              setDropdownOpen(null);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Modifier
          </button>
          <button
            onClick={() => {
              handleDeleteProduct(product.id);
              setDropdownOpen(null);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <Trash2 className="mr-2 h-4 w-4" />
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
    ) : (
        <div className="flex flex-col items-center justify-center p-12">
        <p className="text-center text-gray-500 mb-4">
          {productSearchTerm 
            ? "Aucun produit ne correspond à votre recherche" 
            : "Vous n'avez pas encore de produits dans votre boutique"}
        </p>
      </div>
    )}
  </div>
)}

{/************************************************************************************ Orders Tab **************************************************************************/}
        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6">
              <h3 className="text-lg font-medium text-gray-800">Mes Commandes</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => toggleSelect("status-filter")}
                    className="flex items-center justify-between w-48 px-3 py-2 border rounded-lg bg-white focus:border-[#FAA61A] hover:bg-gray-50"
                  >
                    <span>
                      {orderStatusFilter === "all" && "Tous les statuts"}
                      {orderStatusFilter === "processing" && "En cours"}
                      {orderStatusFilter === "shipped" && "Expédié"}
                      {orderStatusFilter === "delivered" && "Livré"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {selectOpen === "status-filter" && (
                    <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-[#FAA61A] ring-opacity-5 z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setOrderStatusFilter("all");
                            setSelectOpen(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   w-full text-left"
                        >
                          {orderStatusFilter === "all" && <Check className="mr-2 h-4 w-4" />}
                          Tous les statuts
                        </button>
                        <button
                          onClick={() => {
                            setOrderStatusFilter("processing");
                            setSelectOpen(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {orderStatusFilter === "processing" && <Check className="mr-2 h-4 w-4" />}
                          En cours
                        </button>
                        <button
                          onClick={() => {
                            setOrderStatusFilter("shipped");
                            setSelectOpen(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {orderStatusFilter === "shipped" && <Check className="mr-2 h-4 w-4" />}
                          Expédié
                        </button>
                        <button
                          onClick={() => {
                            setOrderStatusFilter("delivered");
                            setSelectOpen(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {orderStatusFilter === "delivered" && <Check className="mr-2 h-4 w-4" />}
                          Livré
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4  text-gray-400" />
                  <input
    type="text"
    placeholder="Rechercher une commande..."
    className="pl-9 pr-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-[#FAA61A] focus:border-transparent"
    value={orderSearchTerm}
    onChange={(e) => setOrderSearchTerm(e.target.value)}
  />
                </div>
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="px-6 py-3">Commande</th>
                      <th className="px-6 py-3">Client</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Statut</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">{order.total.toFixed(2)} €</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="text-[#FAA61A]   text-sm font-medium px-5"
                          >
                                <MoreHorizontal className=" w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
                <div className="p-4 text-center">
                {orderSearchTerm || orderStatusFilter !== "all"
                  ? "Aucune commande ne correspond aux critères" 
                  : "Aucune commande disponible"}
              </div>
            )}
          </div>
        )}

{/***************************************************************************** Settings Tab **************************************************************/}
        {activeTab === "settings" && (
          <div className="grid gap-6 md:grid-cols-2">
            {/************************************** Boutique Information ********************************/}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Informations de la boutique</h3>
              <p className="text-gray-500 text-sm mb-4">Gérez les informations de base de votre boutique</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la boutique
                  </label>
                  <input
                    type="text"
                    id="store-name"
                    defaultValue="Ma Boutique de Mode"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="store-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    id="store-description"
                    defaultValue="Vêtements tendance pour tous les styles"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="store-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    id="store-email"
                    defaultValue="contact@maboutique.com"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="store-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="store-phone"
                    defaultValue="+33 1 23 45 67 89"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A] focus:border-transparent"
                  />
                </div>
                <button className="w-full bg-[#fcb63d] hover:bg-[#FAA61A] text-white py-2 px-4 rounded-lg transition-colors">
                  Enregistrer les modifications
                </button>
              </div>
            </div>

            {/**************************************** Livraison Information *****************************************************************/}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Options de livraison</h3>
              <p className="text-gray-500 text-sm mb-4">Configurez les options de livraison pour votre boutique</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="shipping-standard" className="block text-sm font-medium text-gray-700 mb-1">
                    Livraison standard (€)
                  </label>
                  <input
                    type="number"
                    id="shipping-standard"
                    defaultValue="5.99"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]  focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="shipping-express" className="block text-sm font-medium text-gray-700 mb-1">
                    Livraison express (€)
                  </label>
                  <input
                    type="number"
                    id="shipping-express"
                    defaultValue="12.99"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]  focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="free-shipping-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                    Seuil de livraison gratuite (€)
                  </label>
                  <input
                    type="number"
                    id="free-shipping-threshold"
                    defaultValue="50"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]  focus:border-transparent"
                  />
                </div>
                <button className="w-full bg-[#fcb63d] hover:bg-[#FAA61A] text-white py-2 px-4 rounded-lg transition-colors">
                  Enregistrer les modifications
                </button>
              </div>
            </div>

            

          </div>
        )}
      </div>

      {/* Add/Edit Product Dialog */}
      {isDialogOpen && (
  <div style={{
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(107, 114, 128, 0.5)',
  }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div ref={productModalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <AddProductForm 
        product={editingProduct} // Passe directement l'objet product
        onClose={() => {
          setIsDialogOpen(false);
          setEditingProduct(null); // Réinitialise l'édition
        }}
        onSave={(productData) => {
          if (editingProduct) {
            // Mise à jour du produit existant
            setProducts(products.map(p => 
              p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
            ));
          } else {
            // Ajout d'un nouveau produit
            setProducts([...products, {
              ...productData,
              id: products.length + 1
            }]);
          }
          setIsDialogOpen(false);
          setEditingProduct(null); // Réinitialise l'édition
        }}
      />
    </div>
  </div>
)}
      {/* Order Details Modal */}
      {isOrderDetailsOpen && selectedOrder && (
        <div 
        style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
          }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={orderModalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Détails de la commande {selectedOrder.id}
              </h3>
              <p className="text-gray-500 text-sm mb-6">Commande passée le {selectedOrder.date}</p>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Informations client</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Nom:</span> {selectedOrder.customer}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {selectedOrder.email}
                      </p>
                      <p>
                        <span className="font-medium">Adresse:</span> {selectedOrder.address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Informations commande</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Numéro:</span> {selectedOrder.id}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span> {selectedOrder.date}
                      </p>
                      <p>
                        <span className="font-medium">Paiement:</span> {selectedOrder.payment}
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Statut:</span>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ml-2 ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Articles commandés</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-medium text-gray-500">
                          <th className="px-4 py-3">Produit</th>
                          <th className="px-4 py-3 text-center">Quantité</th>
                          <th className="px-4 py-3 text-center">Prix unitaire</th>
                          <th className="px-4 py-3 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                            <td className="px-4 py-3 text-center">{item.quantity}</td>
                            <td className="px-4 py-3 text-center">{item.price.toFixed(2)} €</td>
                            <td className="px-4 py-3 text-right">{(item.quantity * item.price).toFixed(2)} €</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td colSpan="3" className="px-4 py-3 text-right font-medium">
                            Total
                          </td>
                          <td className="px-4 py-3 text-right font-bold">{selectedOrder.total.toFixed(2)} €</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div  className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-lg">
              <div className="relative">
                <button
                  onClick={() => toggleSelect("order-status")}
                  className="flex items-center justify-between w-48 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50"
                >
                  <span>Changer le statut</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {selectOpen === "order-status" && (
                  <div className="origin-top-right absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "En cours de traitement");
                          setSelectOpen(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        En cours de traitement
                      </button>
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "Expédié");
                          setSelectOpen(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Expédié
                      </button>
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "Livré");
                          setSelectOpen(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Livré
                      </button>
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "Annulé");
                          setSelectOpen(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Annulé
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOrderDetailsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
              
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}