
import { useState, useRef, useEffect } from "react"
import { Search, Trash2 } from "lucide-react"

export default function CustomersContent() {
  // Données des clients
  const [customers, setCustomers] = useState([
    {
      id: 1,
      initials: "EH",
      name: "Esther Howard",
      email: "esther.howard@gmail.com",
      address: "8642 Yule Street, Arvada CO 80007",
    },
    {
      id: 2,
      initials: "WW",
      name: "Wade Warren",
      email: "wade.warren@gmail.com",
      address: "5331 Rexford Court, Montgomery AL 36116",
    },
    {
      id: 3,
      initials: "BS",
      name: "Brooklyn Simmons",
      email: "brooklyn.simmons@gmail.com",
      address: "2325 Eastridge Circle, Moore OK 73160",
    },
    {
      id: 4,
      initials: "RF",
      name: "Robert Fox",
      email: "robert.fox@gmail.com",
      address: "2436 Naples Avenue, Panama City FL 32405",
    },
    {
      id: 5,
      initials: "DR",
      name: "Dianne Russell",
      email: "dianne.russell@gmail.com",
      address: "6095 Terry Lane, Golden CO 80403",
    },
  ])

  // États pour la recherche et la suppression
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState(null)
  const modalRef = useRef(null)

  // Filtrer les clients
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Fermer la modale si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDeleteModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Ouvrir la modale de suppression
  const confirmDelete = (customer) => {
    setCustomerToDelete(customer)
    setShowDeleteModal(true)
  }

  // Supprimer un client
  const deleteCustomer = () => {
    setCustomers(customers.filter(c => c.id !== customerToDelete.id))
    setShowDeleteModal(false)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white  h-full flex flex-col">
      {/* En-tête avec recherche */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Clients</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des clients ..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des clients */}
      <div className="overflow-y-auto px-3 flex-1">
        <table className="min-w-full divide-y  divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[50px]"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-100 text-orange-600 font-medium">
                    {customer.initials}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {customer.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => confirmDelete(customer)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Aucun client trouvé
          </div>
        )}
      </div>

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <div 
        style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
          }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer le client <span className="font-semibold">{customerToDelete?.name}</span> ? 
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
                  onClick={deleteCustomer}
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
  )
}