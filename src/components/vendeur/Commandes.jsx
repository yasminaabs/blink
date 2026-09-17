"use client"

import { useState , useEffect  } from "react"
import { Search, Edit2, Clock, Truck, CheckCircle, XCircle } from "lucide-react"
import axios from "axios"

export default function Orders() {

  const [orders, setOrders] = useState([])

  



  const [isStatusEditOpen, setIsStatusEditOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [newStatus, setNewStatus] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const openStatusEdit = (order) => {
    if (order.status === "cancelled") {
      alert("Action impossible : Une commande annulée ne peut pas être modifiée.")
      return
    }

    setCurrentOrder(order)
    setNewStatus(order.status)
    setIsStatusEditOpen(true)
  }

  // const handleStatusChange = () => {
  //   const updatedOrders = orders.map((order) =>
  //     order.id === currentOrder.id ? { ...order, status: newStatus } : order
  //   )

  //   setOrders(updatedOrders)
  //   setIsStatusEditOpen(false)
  //   alert(`Statut mis à jour : La commande ${currentOrder.id} est maintenant ${getStatusLabel(newStatus)}.`)
  // }

  const handleStatusChange = async () => {
  try {
    // Envoi au serveur
    await axios.put(`http://localhost:4000/api/v1/articles/updatecommande/${currentOrder.id}`, {
      status: newStatus
    });


    // Mise à jour locale (optimiste)
    const updatedOrders = orders.map((order) =>
      order.id === currentOrder.id ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    setIsStatusEditOpen(false);
    alert(`Statut mis à jour : La commande ${currentOrder.id} est maintenant ${newStatus}.`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    alert("Échec de la mise à jour du statut. Veuillez réessayer.");
  }
};


  const getStatusBadge = (status) => {
    switch (status) {
      case "en_attente":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" /> en_attente
          </span>
        )
      case "Expédiee":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Truck className="h-3 w-3 mr-1" /> Expédiee
          </span>
        )
      case "Livre":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Livre
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Annulé
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  // const getStatusLabel = (status) => {
  //   switch (status) {
  //     case "processing":
  //       return "en_attente"
  //     case "shipped":
  //       return "Expédiee"
  //     case "delivered":
  //       return "Livre"
    
  //     default:
  //       return status
  //   }
  // }



  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false

    if (
      searchTerm &&
      !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.productName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const vendorId=2

  useEffect(() => {
  axios
    .get(`http://localhost:4000/api/v1/articles/getcommandes/${vendorId}`)
    .then((response) => {
      console.log("Réponse API :", response.data)
      setOrders(response.data.articleDetails)
    })
    .catch((error) => {
      console.error('Erreur de chargement des commandes :', error)
    })
}, [])

const groupedOrders = Object.values(
  filteredOrders.reduce((acc, item) => {
    const orderId = item.id

    if (!acc[orderId]) {
      acc[orderId] = {
        ...item,
        products: [],
        totalAmount: 0
      }
    }

    acc[orderId].products.push({
      name: item.productName,
      quantity: item.quantity
    })

    acc[orderId].totalAmount += Number(item.total)

    return acc
  }, {})
)



  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6 ">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 " />
              <input
                type="search"
                placeholder="Rechercher une commande..."
                className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-[#FAA61A]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="w-full sm:w-48 px-4 py-2 bg-white border focus:ring-2 focus:ring-[#fcb63d] focus:border-[#FAA61A] border-gray-300 rounded-lg "
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="En_attente">En attente</option>
              <option value="Expédiee">Expédié</option>
              <option value="Livre">Livré</option>
             
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead >
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="p-3 font-medium text-center text-gray-600">Commande</th>
                  <th className="p-3 text-center font-medium text-gray-600">Client</th>
                  <th className=" p-3 text-center font-medium text-gray-600">Date</th>
                  <th className="p-3 text-center font-medium text-gray-600">Produit</th>
                  <th className=" p-3 text-center font-medium text-gray-600">Total</th>
                  <th className=" p-3 text-center font-medium text-gray-600">Statut</th>
                  <th className=" p-3 text-center font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-6">
                      <div>
                        <p className="font-s">{order.nom} {order.prenom}</p>                       
                      </div>
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      {new Date(order.date_commande).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </td>

                    <td className="py-3 px-6">
                      {/* <div>
                        <p className="font-m">{order.productName}</p>
                        <p className="text-sm text-gray-500">Quantité : {order.quantity}</p>
                      </div>
                       */}
                       {order.products.map((prod, index) => (
          <div key={index} className="border p-2 rounded-md">
            <p className="font-semibold">{prod.name}</p>
            <p className="text-sm text-gray-500">Quantité : {prod.quantity}</p>
          </div>
        ))}
                    </td>
                    <td className="py-3 px-6 text-right font-sm text-gray-900">
                      {Number(order.total).toFixed(2)} €
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => openStatusEdit(order)}
                        disabled={order.status === "cancelled"}
                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                          order.status === "cancelled" 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "text-[#FAA61A] npm run devhover:bg-[#faa81a0c]"
                        }`}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isStatusEditOpen && (
          <div 
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
          }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Modifier le statut</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Commande</p>
                  <p className="font-medium">{currentOrder?.id} - {currentOrder?.customer}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Statut actuel</p>
                  {getStatusBadge(currentOrder?.status)}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Nouveau statut</p>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcb63d] focus:border-[#FAA61A]"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="En_attente">En_attente</option>
                    <option value="Expediee">Expediee</option>
                    <option value="Livre">Livre</option>
                 
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsStatusEditOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleStatusChange}
                    className="px-4 py-2 text-white bg-[#fcb63d] hover:bg-[#FAA61A] rounded-lg"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}