import { useState, useRef, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Users,
  DollarSign,
  Star,
  Package,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

export default function VendeursContent() {
  // Données des vendeurs
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Fashion Store",
      owner: "Alexandre Martin",
      email: "alex@fashionstore.com",
      phone: "+33 6 12 34 56 78",
      products: 24,
      sales: 12450,
      commission: 10,
      rating: 4.8,
      status: "Actif",
      joinDate: "15 Jan, 2023",
      address: "123 Rue de la Mode, 75001 Paris",
      description: "Boutique spécialisée dans les vêtements tendance pour hommes et femmes.",
    },
    {
      id: 90,
      name: "Fashion Store",
      owner: "Alexandre Martin",
      email: "alex@fashionstore.com",
      phone: "+33 6 12 34 56 78",
      products: 24,
      sales: 12450,
      commission: 10,
      rating: 4.8,
      status: "Actif",
      joinDate: "15 Jan, 2023",
      address: "123 Rue de la Mode, 75001 Paris",
      description: "Boutique spécialisée dans les vêtements tendance pour hommes et femmes.",
    },
    {
      id: 91,
      name: "Fashion Store",
      owner: "Alexandre Martin",
      email: "alex@fashionstore.com",
      phone: "+33 6 12 34 56 78",
      products: 24,
      sales: 12450,
      commission: 10,
      rating: 4.8,
      status: "Actif",
      joinDate: "15 Jan, 2023",
      address: "123 Rue de la Mode, 75001 Paris",
      description: "Boutique spécialisée dans les vêtements tendance pour hommes et femmes.",
    },
    {
      id: 92,
      name: "Style Boutique",
      owner: "Sophie Dubois",
      email: "sophie@styleboutique.com",
      phone: "+33 6 23 45 67 89",
      products: 18,
      sales: 8750,
      commission: 12,
      rating: 4.5,
      status: "Actif",
      joinDate: "22 Jan, 2023",
      address: "45 Avenue du Style, 69002 Lyon",
      description: "Vêtements de créateurs et accessoires de mode haut de gamme.",
    },
    {
      id: 3,
      name: "Urban Trends",
      owner: "Thomas Leroy",
      email: "thomas@urbantrends.com",
      phone: "+33 6 34 56 78 90",
      products: 32,
      sales: 15200,
      commission: 8,
      rating: 4.2,
      status: "Actif",
      joinDate: "5 Feb, 2023",
      address: "78 Rue Urbaine, 33000 Bordeaux",
      description: "Mode urbaine et streetwear pour la jeune génération.",
    },
    {
      id: 4,
      name: "Élégance Paris",
      owner: "Marie Petit",
      email: "marie@eleganceparis.com",
      phone: "+33 6 45 67 89 01",
      products: 15,
      sales: 9800,
      commission: 15,
      rating: 4.9,
      status: "Actif",
      joinDate: "12 Feb, 2023",
      address: "22 Boulevard Haussmann, 75009 Paris",
      description: "Vêtements élégants et accessoires de luxe pour femmes.",
    },
    {
      id: 5,
      name: "Casual Wear",
      owner: "Lucas Bernard",
      email: "lucas@casualwear.com",
      phone: "+33 6 56 78 90 12",
      products: 28,
      sales: 7300,
      commission: 10,
      rating: 4.0,
      status: "En attente",
      joinDate: "20 Feb, 2023",
      address: "56 Rue du Confort, 44000 Nantes",
      description: "Vêtements décontractés et confortables pour toute la famille.",
    },
    {
      id: 6,
      name: "Vintage Collection",
      owner: "Emma Rousseau",
      email: "emma@vintagecollection.com",
      phone: "+33 6 67 89 01 23",
      products: 12,
      sales: 4200,
      commission: 12,
      rating: 4.3,
      status: "Suspendu",
      joinDate: "1 Mar, 2023",
      address: "34 Rue Rétro, 13001 Marseille",
      description: "Vêtements et accessoires vintage authentiques des années 60 à 90.",
    },
  ]);

  // Données des produits
  const [vendorProducts, setVendorProducts] = useState([
    {
      id: 101,
      vendorId: 1,
      name: "T-shirt Noir Basique",
      category: "T-shirts",
      price: 19.99,
      stock: 45,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 102,
      vendorId: 1,
      name: "Chemise Blanche Élégante",
      category: "Chemises",
      price: 39.99,
      stock: 28,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 103,
      vendorId: 1,
      name: "Pantalon Noir Classique",
      category: "Pantalons",
      price: 49.99,
      stock: 32,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 104,
      vendorId: 1,
      name: "Veste Légère Unisexe",
      category: "Vestes",
      price: 59.99,
      stock: 18,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 105,
      vendorId: 1,
      name: "Pull Gris Chiné",
      category: "Pulls",
      price: 45.99,
      stock: 22,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 201,
      vendorId: 2,
      name: "Robe de Soirée Noire",
      category: "Robes",
      price: 89.99,
      stock: 15,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 202,
      vendorId: 2,
      name: "Blazer Élégant",
      category: "Vestes",
      price: 79.99,
      stock: 12,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 203,
      vendorId: 2,
      name: "Jupe Plissée",
      category: "Jupes",
      price: 49.99,
      stock: 20,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 204,
      vendorId: 2,
      name: "Ensemble Tailleur",
      category: "Ensembles",
      price: 129.99,
      stock: 8,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 301,
      vendorId: 3,
      name: "Sweat à Capuche Streetwear",
      category: "Sweats",
      price: 54.99,
      stock: 30,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 302,
      vendorId: 3,
      name: "Jean Déchiré Tendance",
      category: "Jeans",
      price: 69.99,
      stock: 25,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 303,
      vendorId: 3,
      name: "Casquette Urban Style",
      category: "Accessoires",
      price: 24.99,
      stock: 40,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 304,
      vendorId: 3,
      name: "Sneakers Urbaines",
      category: "Chaussures",
      price: 89.99,
      stock: 15,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 401,
      vendorId: 4,
      name: "Foulard en Soie",
      category: "Accessoires",
      price: 79.99,
      stock: 18,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 402,
      vendorId: 4,
      name: "Sac à Main Luxe",
      category: "Sacs",
      price: 149.99,
      stock: 10,
      status: "En vente",
      image: "/placeholder.svg",
    },
    {
      id: 403,
      vendorId: 4,
      name: "Escarpins Classiques",
      category: "Chaussures",
      price: 119.99,
      stock: 12,
      status: "En vente",
      image: "/placeholder.svg",
    },
  ]);

  // États
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isVendorDetailsOpen, setIsVendorDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false);
  const [newCommissionRate, setNewCommissionRate] = useState(10);
  const [commissionVendorId, setCommissionVendorId] = useState(null);
  const [selectedVendorProducts, setSelectedVendorProducts] = useState([]);
  const [isVendorProductsOpen, setIsVendorProductsOpen] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});
  const modalRef = useRef(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
const [productToDelete, setProductToDelete] = useState(null);

  // Statistiques
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === "Actif").length;
  const suspendedVendors = vendors.filter((v) => v.status === "Suspendu").length;
  const totalSales = vendors.reduce((sum, vendor) => sum + vendor.sales, 0);
  const totalCommission = vendors.reduce(
    (sum, vendor) => sum + (vendor.sales * vendor.commission) / 100,
    0
  );

  // Fonctions
  const viewVendorDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsVendorDetailsOpen(true);
    setOpenDropdownId(null); // Ferme le menu après l'action
  };
//pour gerer la quppression
  const handleDeleteProduct = () => {
    setVendorProducts(vendorProducts.filter(p => p.id !== productToDelete.id));
    setSelectedVendorProducts(selectedVendorProducts.filter(p => p.id !== productToDelete.id));
    setIsDeleteConfirmOpen(false);
    setOpenDropdownId(null);
  };


  const updateVendorStatus = (vendorId, newStatus) => {
    setVendors(
      vendors.map((v) =>
        v.id === vendorId ? { ...v, status: newStatus } : v
      )
    );
    setIsVendorDetailsOpen(false);
    setOpenDropdownId(null); // Ferme le menu après l'action
  };

  const openCommissionDialog = (vendorId) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    setNewCommissionRate(vendor.commission);
    setCommissionVendorId(vendorId);
    setIsCommissionDialogOpen(true);
    setOpenDropdownId(null); // Ferme le menu après l'action
  };

  const updateCommissionRate = () => {
    setVendors(
      vendors.map((v) =>
        v.id === commissionVendorId ? { ...v, commission: newCommissionRate } : v
      )
    );
    setIsCommissionDialogOpen(false);
  };

  const viewVendorProducts = (vendorId) => {
    setSelectedVendorProducts(
      vendorProducts.filter((p) => p.vendorId === vendorId)
    );
    setIsVendorProductsOpen(true);
    setOpenDropdownId(null); // Ferme le menu après l'action
  };

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
    setOpenDropdownId(null); // Ferme le menu après l'action
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Filtres
  const filteredVendors = vendors.filter((vendor) => {
    if (statusFilter !== "all" && vendor.status !== statusFilter) return false;
    if (
      searchTerm &&
      !vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !vendor.owner.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const filteredVendorProducts = selectedVendorProducts.filter((product) => {
    if (
      productSearchTerm &&
      !product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer les dropdowns si on clique à l'extérieur
      Object.values(dropdownRefs.current).forEach(ref => {
        if (ref && !ref.contains(event.target)) {
          setOpenDropdownId(null);
        }
      });
  
      // Fermer les modals si on clique à l'extérieur
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVendorDetailsOpen(false);
        setIsCommissionDialogOpen(false);
        setIsVendorProductsOpen(false);
        setIsProductDetailsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 border border-gray-200 ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Vendeurs</h1>
          <p className="text-gray-600">Administrez les vendeurs et leurs produits</p>
        </div>
      </div>

      {/* Vue d'ensemble */}
      {activeTab === "overview" && (
        <div className="relative ">
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-gray-500 text-sm">Total vendeurs</div>
              <div className="text-2xl font-bold">{totalVendors}</div>
              <div className="text-xs text-gray-500">+2 ce mois-ci</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-gray-500 text-sm">Vendeurs actifs</div>
              <div className="text-2xl font-bold">{activeVendors}</div>
              <div className="text-xs text-gray-500">
                {Math.round((activeVendors / totalVendors) * 100)}% du total
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-gray-500 text-sm">Ventes totales</div>
              <div className="text-2xl font-bold">{totalSales.toLocaleString()} €</div>
              <div className="text-xs text-gray-500">+8% vs mois dernier</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-gray-500 text-sm">Commissions</div>
              <div className="text-2xl font-bold">{totalCommission.toLocaleString()} €</div>
              <div className="text-xs text-gray-500">Revenus plateforme</div>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-bold">Liste des vendeurs</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="Actif">Actifs</option>
                    <option value="En attente">En attente</option>
                    <option value="Suspendu">Suspendus</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un vendeur"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des vendeurs */}
          <div className="bg-white w-fit">
            <div className="w-fit">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Boutique
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propriétaire
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produits
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ventes
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{vendor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vendor.owner}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vendor.products}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vendor.sales.toLocaleString()} €</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vendor.commission}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          {vendor.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            vendor.status === "Actif"
                              ? "bg-green-100 text-green-800"
                              : vendor.status === "Suspendu"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="inline-block text-left">
                          <button
                            type="button"
                            className="inline-flex justify-center w-5 h-6 px-1 rounded-[50] hover:bg-gray-100"
                            onClick={(e) => toggleDropdown(vendor.id, e)}
                          >
                            <MoreHorizontal className="w-4" />
                          </button>

                          {openDropdownId === vendor.id && (
                            <div
                              ref={(el) => (dropdownRefs.current[vendor.id] = el)}
                              className="absolute right-0 z-50 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 origin-top-right"
                              style={{
                                position: 'absolute',
                                willChange: 'transform',
                              }}                            >
                              <div className="py-1">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => viewVendorDetails(vendor)}
                                >
                                  Voir détails
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => viewVendorProducts(vendor.id)}
                                >
                                  <div className="flex items-center">
                                    <Package className="h-4 w-4 mr-2 text-purple-600" />
                                    Voir produits
                                  </div>
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => openCommissionDialog(vendor.id)}
                                >
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                                    Modifier commission
                                  </div>
                                </button>
                                {vendor.status !== "Actif" && (
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={() => updateVendorStatus(vendor.id, "Actif")}
                                  >
                                    <div className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                      Activer
                                    </div>
                                  </button>
                                )}
                                {vendor.status !== "Suspendu" && (
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={() => updateVendorStatus(vendor.id, "Suspendu")}
                                  >
                                    <div className="flex items-center">
                                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                                      Suspendre
                                    </div>
                                  </button>
                                )}
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

            {filteredVendors.length === 0 && (
              <div className="p-8 text-center text-gray-500">Aucun vendeur trouvé</div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}

      {/* Modal Détails Vendeur */}
      {isVendorDetailsOpen && selectedVendor && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(107, 114, 128, 0.5)",
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Détails du vendeur</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsVendorDetailsOpen(false)}
                >
                
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-2">Informations boutique</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Nom:</span> {selectedVendor.name}
                    </p>
                    <p>
                      <span className="font-medium">Date d'inscription:</span>{" "}
                      {selectedVendor.joinDate}
                    </p>
                    <p>
                      <span className="font-medium">Adresse:</span> {selectedVendor.address}
                    </p>
                    <p>
                      <span className="font-medium">Description:</span>{" "}
                      {selectedVendor.description}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Informations propriétaire</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Nom:</span> {selectedVendor.owner}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {selectedVendor.email}
                    </p>
                    <p>
                      <span className="font-medium">Téléphone:</span> {selectedVendor.phone}
                    </p>
                    <p>
                      <span className="font-medium">Statut:</span>
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedVendor.status === "Actif"
                            ? "bg-green-100 text-green-800"
                            : selectedVendor.status === "Suspendu"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedVendor.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Produits</div>
                  <div className="text-2xl font-bold">{selectedVendor.products}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Ventes</div>
                  <div className="text-2xl font-bold">
                    {selectedVendor.sales.toLocaleString()} €
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Commission</div>
                  <div className="text-2xl font-bold">{selectedVendor.commission}%</div>
                  <div className="text-xs text-gray-500">
                    {(
                      (selectedVendor.sales * selectedVendor.commission) /
                      100
                    ).toLocaleString()}{" "}
                    € générés
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div className="flex gap-2">
                  {selectedVendor.status !== "Actif" && (
                    <button
                      className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 flex items-center"
                      onClick={() => updateVendorStatus(selectedVendor.id, "Actif")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activer
                    </button>
                  )}
                  {selectedVendor.status !== "Suspendu" && (
                    <button
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center"
                      onClick={() => updateVendorStatus(selectedVendor.id, "Suspendu")}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Suspendre
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => setIsVendorDetailsOpen(false)}
                  >
                    Fermer
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    onClick={() => {
                      setIsVendorDetailsOpen(false);
                      viewVendorProducts(selectedVendor.id);
                    }}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Voir produits
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification Commission */}
      {isCommissionDialogOpen && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(107, 114, 128, 0.5)",
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Modifier le taux de commission</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsCommissionDialogOpen(false)}
                >
                
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taux de commission (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCommissionRate}
                    onChange={(e) => setNewCommissionRate(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-gray-200">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setIsCommissionDialogOpen(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-[#fcb63d] hover:bg-[#FAA61A] text-white rounded-md flex items-center"
                  onClick={updateCommissionRate}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Produits du Vendeur */}
      {isVendorProductsOpen && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(107, 114, 128, 0.5)",
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Produits du vendeur</h2>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVendorProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">{product.name}</td>
                        <td className="px-4 py-3">{product.category}</td>
                        <td className="px-4 py-3">{product.price.toFixed(2)} €</td>
                        <td className="px-4 py-3">{product.stock}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              product.status === "En vente"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="relative inline-block text-left">
                            <button
                              type="button"
                              className="inline-flex justify-center w-5 h-6 px-1  hover:bg-gray-100"
                              onClick={() => toggleDropdown(product.id)}
                            >
                              <MoreHorizontal className=" w-4" />
                            </button>

                            {openDropdownId === product.id && (
                              <div
                                ref={(el) => (dropdownRefs.current[product.id] = el)}
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                              >
                                <div className="py-1">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                                    onClick={() => viewProductDetails(product)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Voir détails
                                  </button>
                                  <button
  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
  onClick={() => {
    setProductToDelete(product);
    setIsDeleteConfirmOpen(true);
    setOpenDropdownId(null);
  }}
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

              {filteredVendorProducts.length === 0 && (
                <div className="p-8 text-center text-gray-500">Aucun produit trouvé</div>
              )}

              <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-gray-200">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setIsVendorProductsOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
{/* Modal confirmaton suppression*/}

{/* Modal Confirmation Suppression */}
{isDeleteConfirmOpen && (
  <div
    style={{
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      backgroundColor: "rgba(107, 114, 128, 0.5)",
    }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      ref={modalRef}
      className="bg-white rounded-lg shadow-xl w-full max-w-md"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Confirmer la suppression</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsDeleteConfirmOpen(false)}
          >
      
          </button>
        </div>

        <div className="space-y-4">
          <p>Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.name}" ?</p>
          <p className="text-sm text-gray-500">Cette action est irréversible.</p>
        </div>

        <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-gray-200">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setIsDeleteConfirmOpen(false)}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            onClick={handleDeleteProduct}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      {/* Modal Détails Produit */}
      {isProductDetailsOpen && selectedProduct && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(107, 114, 128, 0.5)",
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Détails du produit</h2>
                <button
                  onClick={() => setIsProductDetailsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
               
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom</p>
                  <p>{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Catégorie</p>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Prix</p>
                  <p>{selectedProduct.price.toFixed(2)} €</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Stock</p>
                  <p>{selectedProduct.stock}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                      selectedProduct.status === "En vente"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedProduct.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t mt-2 border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsProductDetailsOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}