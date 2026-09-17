import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, AlertCircle } from 'lucide-react';
import article from '../../assets/ARTICLE.svg'

const WishlistItems = () => {
  // Données de démonstration
  const initialWishlistItems = [
    {
      id: 1,
      name: "T-shirt Noir Oversize",
      price: 29.99,
      image: article,
      inStock: true,
      category: "T-shirts",
    },
    {
      id: 2,
      name: "Veste en Cuir Vintage",
      price: 129.99,
      image: article,
      inStock: true,
      category: "Vestes",
    },
    {
      id: 3,
      name: "Pantalon Cargo Militaire",
      price: 59.99,
      image: article,
      inStock: false,
      category: "Pantalons",
    },
    {
      id: 4,
      name: "Robe d'été légère",
      price: 49.99,
      image: article,
      inStock: true,
      category: "Robes",
    },
  ];

  // États
  const [items, setItems] = useState(initialWishlistItems);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  // Gestion des actions
  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    setItems(items.filter((item) => item.id !== itemToRemove));
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const handleAddToCart = (item) => {
    // Dans une vraie application, on ajouterait ici l'article au panier
    console.log("Article ajouté au panier:", item);

    // Retirer de la liste de souhaits
    setItems(items.filter((i) => i.id !== item.id));

    // Afficher la confirmation avec le nom de l'article
    setAddedItem(item.name);
    setShowAddedToCart(true);

    // Masquer le message après 3 secondes
    setTimeout(() => {
      setShowAddedToCart(false);
      setAddedItem(null);
    }, 3000);
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-6">Ma Liste de Souhaits</h2>

      {/* Message d'ajout au panier */}
      {showAddedToCart && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div>
            <span className="font-medium">{addedItem}</span> ajouté au panier et retiré de la liste de souhaits.
          </div>
        </div>
      )}

      {/* Liste vide */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Votre liste de souhaits est vide</h3>
          <p className="text-gray-500 mb-6">
            Ajoutez des articles à votre liste de souhaits pour les sauvegarder pour plus tard.
          </p>
        </div>
      ) : (
        /* Liste des articles */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="border rounded-lg overflow-hidden group hover:shadow-md border-gray-200 transition-shadow"
              aria-label={`Article: ${item.name}`}
            >
              {/* Image de l'article */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="object-contain p-4 w-full h-full"
                  loading="lazy"
                />
                {/* Badge rupture de stock */}
                {!item.inStock && (
                  <div className="absolute top-2 right-2 bg-red-100 text-red-500 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Rupture de stock
                  </div>
                )}
              
              </div>

              {/* Détails de l'article */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-700 mb-4">{item.price.toFixed(2)} €</p>
                
                {/* Boutons d'action */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                      item.inStock
                        ? " text-white bg-[#fcb63d] hover:bg-[#FAA61A] cursor-pointer"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    } transition-colors`}
                    aria-label={`Ajouter ${item.name} au panier`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter au Panier
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    aria-label={`Retirer ${item.name} de la liste de souhaits`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showConfirmation && (
        <div 
        style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
        }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={cancelRemove}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Retirer de la Liste de Souhaits</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir retirer cet article de votre liste de souhaits ?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelRemove}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmRemove}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Retirer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistItems;