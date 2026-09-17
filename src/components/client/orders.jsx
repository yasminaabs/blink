import React, { useState } from 'react';
import article from '../../assets/ARTICLE.svg'
import { Eye, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

const OrdersList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Données de commande exemple
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-11-15",
      total: 129.99,
      status: "Livré",
      items: [
        {
          id: 1,
          name: "T-shirt Noir Oversize",
          price: 29.99,
          quantity: 1,
          image:  article ,
          store: "Fashion Trends",
        },
        {
          id: 2,
          name: "Pantalon Cargo Militaire",
          price: 59.99,
          quantity: 1,
          image:  article ,
          store: "Urban Style",
        },
      ],
      shippingCost: 12.99,
    },
    {
      id: "ORD-12346",
      date: "2023-11-28",
      total: 142.98,
      status: "Expédié",
      items: [
        {
          id: 3,
          name: "Veste en Cuir Vintage",
          price: 129.99,
          quantity: 1,
          image:  article ,
          store: "Vintage Collection",
        },
      ],
      shippingCost: 12.99,
    },
    {
      id: "ORD-12347",
      date: "2023-12-05",
      total: 62.98,
      status: "En traitement",
      items: [
        {
          id: 4,
          name: "Robe d'été légère",
          price: 49.99,
          quantity: 1,
          image:  article ,
          store: "Summer Vibes",
        },
      ],
      shippingCost: 12.99,
    },
  ];

  // Gestion des actions
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
  };

  // Fonctions utilitaires
  const getStatusIcon = (status) => {
    switch (status) {
      case "Livré":
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case "Expédié":
        return <Truck className="w-3 h-3 text-blue-500" />;
      case "En traitement":
        return <Package className="w-3 h-3 text-orange-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-800";
      case "Expédié":
        return "bg-blue-100 text-blue-800";
      case "En traitement":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-6">Mes Commandes</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <Package className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Pas encore de commandes</h3>
          <p className="text-gray-500 mb-6">Votre historique de commandes est en attente d'être rempli.</p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-6 py-3 rounded-md  transition-colors cursor-pointer"
          >
            Commencer vos achats
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-[#fcb63d] hover:text-[#FAA61A] flex items-center cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de détails de commande */}
      {showOrderDetails && selectedOrder && (
        <div 
        style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
        }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeOrderDetails}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Détails de la commande: {selectedOrder.id}</h3>
                <button 
                  onClick={closeOrderDetails} 
                  className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  aria-label="Fermer les détails"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Date de commande</p>
                  <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedOrder.status)}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1">{selectedOrder.status}</span>
                  </span>
                </div>
              </div>

              <h4 className="font-medium mb-4">Articles</h4>
              <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Boutique
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantité
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{item.store}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">
                          {item.price.toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm text-gray-700 mb-2">
                  <p>Sous-total</p>
                  <p>{selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €</p>
                </div>
                <div className="flex justify-between text-sm text-gray-700 mb-2">
                  <p>Frais de livraison</p>
                  <p>{selectedOrder.shippingCost.toFixed(2)} €</p>
                </div>
                <div className="flex justify-between text-base font-medium border-gray-200 text-gray-900 mt-4 pt-4 border-t">
                  <p>Total</p>
                  <p>{selectedOrder.total.toFixed(2)} €</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={closeOrderDetails}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md  hover:bg-gray-300 transition-colors mr-2 cursor-pointer"
              >
                Fermer
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersList;