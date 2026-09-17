import { useState, useRef, useEffect } from "react";
import { Star, Search, Trash2, Info } from "lucide-react";

export default function ReviewsContent() {
  // Données des avis avec noms de boutique
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Classic Monochrome Tees",
      customer: "Jean Dupont",
      rating: 5,
      comment: "Excellent produit, très confortable et de bonne qualité. Je recommande vivement !",
      date: "20 Mar, 2023",
      shop: "Paris Fashion"
    },
    {
      id: 2,
      product: "Monochromatic Wardrobe",
      customer: "Marie Martin",
      rating: 4,
      comment: "Très beau produit, mais un peu cher. La qualité est au rendez-vous cependant.",
      date: "18 Mar, 2023",
      shop: "Lyon Styles"
    },
    {
      id: 3,
      product: "Essential Neutrals",
      customer: "Lucas Bernard",
      rating: 2,
      comment: "Déçu par la qualité, le tissu s'est abîmé après seulement deux lavages.",
      date: "15 Mar, 2023",
      shop: "Marseille Shop"
    },
    {
      id: 4,
      product: "Sleek and Cozy Black",
      customer: "Sophie Petit",
      rating: 1,
      comment: "Produit reçu avec un défaut. Service client inexistant. À éviter absolument !",
      date: "12 Mar, 2023",
      shop: "Paris Fashion"
    },
    {
      id: 5,
      product: "Classic Monochrome Tees",
      customer: "Thomas Leroy",
      rating: 5,
      comment: "Parfait ! Taille conforme et livraison rapide. Je suis très satisfait.",
      date: "10 Mar, 2023",
      shop: "Lyon Styles"
    },
  ]);

  // États de gestion
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const modalRef = useRef(null);

  // Générer la liste des boutiques uniques
  const shops = [...new Set(reviews.map((review) => review.shop))];

  // Filtrer les avis
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.shop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesShop = selectedShop === "all" || review.shop === selectedShop;

    return matchesSearch && matchesShop;
  });

  // Gestion du clic externe
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsDeleteModalOpen(false);
        setIsDetailModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Actions
  const openDetailModal = (review) => {
    setSelectedReview(review);
    setIsDetailModalOpen(true);
  };

  const confirmDelete = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const deleteReview = () => {
    setReviews(reviews.filter((r) => r.id !== selectedReview.id));
    setIsDeleteModalOpen(false);
  };

  // Affichage des étoiles
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white h-full flex flex-col">
      {/* En-tête avec filtres */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
        <h2 className="text-xl font-semibold text-gray-800">Avis Clients</h2>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Dropdown des boutiques */}
          <div className="relative w-full md:w-48">
            <select
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
            >
              <option value="all">Toutes les boutiques</option>
              {shops.map((shop, index) => (
                <option key={index} value={shop}>
                  {shop}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Champ de recherche */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des avis..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tableau des avis */}
      <div className="overflow-y-auto px-3 flex-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Boutique
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {review.shop}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {review.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {review.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">{renderStars(review.rating)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {review.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openDetailModal(review)}
                      className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                      aria-label="Détails"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => confirmDelete(review)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReviews.length === 0 && (
          <div className="p-8 text-center text-gray-500">Aucun avis trouvé</div>
        )}
      </div>

      {/* Modale de détails */}
      {isDetailModalOpen && selectedReview && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(107, 114, 128, 0.5)",
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Détails de l'avis</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Boutique</p>
                  <p className="mt-1">{selectedReview.shop}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Produit</p>
                  <p className="mt-1">{selectedReview.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="mt-1">{selectedReview.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Note</p>
                  <div className="flex mt-1">{renderStars(selectedReview.rating)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="mt-1">{selectedReview.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Commentaire</p>
                  <p className="mt-1 p-3 bg-gray-50 rounded-md">{selectedReview.comment}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale de suppression */}
      {isDeleteModalOpen && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(107, 114, 128, 0.5)",
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer l'avis de{" "}
                <span className="font-semibold">{selectedReview?.customer}</span> ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={deleteReview}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}