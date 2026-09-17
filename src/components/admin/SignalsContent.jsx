

import { useState, useRef, useEffect } from "react"
import { Search, Trash2, AlertTriangle, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"

export default function SignalsContent() {
  // Données des produits signalés (uniquement des vêtements)
  const [signalProducts, setSignalProducts] = useState([
    {
      id: 1,
      name: "T-shirt Noir Oversize",
      reason: "Contrefaçon de marque",
      reporter: "Jean Dupont",
      date: "15 Mar, 2023",
      status: "En attente",
    },
    {
      id: 2,
      name: "Veste en Cuir Vintage",
      reason: "Cuir de mauvaise qualité",
      reporter: "Marie Martin",
      date: "12 Mar, 2023",
      status: "En attente",
    },
    {
      id: 3,
      name: "Pantalon Cargo Militaire",
      reason: "Coutures qui se défont au premier lavage",
      reporter: "Lucas Bernard",
      date: "10 Mar, 2023",
      status: "En attente",
    },
    {
      id: 4,
      name: "Robe d'été légère",
      reason: "Couleur différente de la photo",
      reporter: "Sophie Lambert",
      date: "05 Avr, 2023",
      status: "En attente",
    },
    {
      id: 5,
      name: "Ensemble de sport",
      reason: "Tissu provoquant des irritations",
      reporter: "Thomas Leroy",
      date: "28 Mar, 2023",
      status: "Résolu",
    },
    {
      id: 6,
      name: "Manteau d'hiver isolé",
      reason: "Isolation inefficace",
      reporter: "Nathalie Dubois",
      date: "22 Mar, 2023",
      status: "En attente",
    },
    {
      id: 7,
      name: "Short de bain",
      reason: "Décoloration au contact de l'eau",
      reporter: "Marc Antoine",
      date: "18 Mar, 2023",
      status: "En attente",
    },
    {
      id: 8,
      name: "Chemise habillée",
      reason: "Boutons manquants",
      reporter: "Élodie Martin",
      date: "12 Mar, 2023",
      status: "Résolu",
    },
    {
      id: 9,
      name: "Pull en laine",
      reason: "Tissu qui bouloche après lavage",
      reporter: "Pauline Chevalier",
      date: "08 Mar, 2023",
      status: "En attente",
    },
    {
      id: 10,
      name: "Jupe plissée",
      reason: "Tailles non conformes",
      reporter: "Antoine Girard",
      date: "02 Mar, 2023",
      status: "En attente",
    }
  ]);

  // États pour la recherche et les modales
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});
  const modalRef = useRef(null);

  // Filtrer les produits
  const filteredProducts = signalProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fermer les modales si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer les dropdowns
      if (Object.values(dropdownRefs.current).every(ref => 
        ref && !ref.contains(event.target)
      )) {
        setOpenDropdownId(null);
      }

      // Fermer les modales
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
        setShowDetailsModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gestion des dropdowns
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Ouvrir la modale de suppression
  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
    setOpenDropdownId(null);
  };

  // Ouvrir la modale de détails
  const openDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
    setOpenDropdownId(null);
  };

  // Supprimer un produit
  const deleteProduct = () => {
    setSignalProducts(signalProducts.filter(p => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
  };

  // Marquer comme résolu
  const resolveSignal = (id) => {
    setSignalProducts(signalProducts.map(p => 
      p.id === id ? { ...p, status: "Résolu" } : p
    ));
    setOpenDropdownId(null);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white h-full flex flex-col">
      {/* En-tête avec recherche */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Signalements Vêtements</h2>
        
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des signalements..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des signalements */}
      <div className="overflow-y-auto px-3 flex-1">
        <table className="min-w-full divide-y  divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Vêtement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">Raison</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Signalé par</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-[180px]" title={product.name}>
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 truncate max-w-[240px]" title={product.reason}>
                    {product.reason}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 truncate max-w-[140px]" title={product.reporter}>
                    {product.reporter}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {product.date}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === "Résolu" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    onClick={() => toggleDropdown(product.id)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Actions"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>

                  {openDropdownId === product.id && (
                    <div 
                      ref={el => dropdownRefs.current[product.id] = el}
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => openDetails(product)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Voir les détails
                        </button>
                        {product.status !== "Résolu" && (
                          <button
                            onClick={() => resolveSignal(product.id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Marquer comme résolu
                          </button>
                        )}
                        <button
                          onClick={() => confirmDelete(product)}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer le produit
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <AlertTriangle className="h-10 w-10 text-gray-300 mb-2" />
            Aucun vêtement signalé trouvé
          </div>
        )}
      </div>

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <div style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(107, 114, 128, 0.5)',
        }}
         className="fixed inset-0 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer le vêtement <span className="font-semibold">{selectedProduct?.name}</span> ? 
                Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={deleteProduct}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale de détails */}
      {showDetailsModal && selectedProduct && (
        <div style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(107, 114, 128, 0.5)',
        }} className="fixed inset-0 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Détails du signalement</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Vêtement</p>
                  <p className="text-sm font-medium">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Raison du signalement</p>
                  <p className="text-sm font-medium">{selectedProduct.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Signalé par</p>
                  <p className="text-sm font-medium">{selectedProduct.reporter}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date du signalement</p>
                  <p className="text-sm font-medium">{selectedProduct.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedProduct.status === "Résolu" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {selectedProduct.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {selectedProduct.status !== "Résolu" && (
                  <button
                    onClick={() => {
                      resolveSignal(selectedProduct.id);
                      setShowDetailsModal(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Marquer comme résolu
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
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