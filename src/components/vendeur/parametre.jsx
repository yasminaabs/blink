"use client"

import { useState } from "react"
import { User, Store, CreditCard, Bell, Shield, Save } from "lucide-react"
import { useEffect } from "react"
import axios from "axios"

export default function Settings() {
  const [activeTab, setActiveTab] = useState('store')
  // const [storeInfo, setStoreInfo] = useState({
  //   name: "Fashion Boutique",
  //   description: "Vêtements et accessoires de mode",
  //   address: "123 Rue du Commerce",
  //   city: "Bejaia",
  //   postalCode: "066000",
  //   country: "Algerie",
  //   phone: "+33 1 23 45 67 89",
  //   email: "contact@fashionboutique.com",
  //   website: "www.fashionboutique.com",
  // })

  const [storeInfo, setStoreInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});



  // const [personalInfo, setPersonalInfo] = useState({
  //   firstName: "Jean",
  //   lastName: "Dupont",
  //   email: "jean.dupont@example.com",
  //   phone: "+33 6 12 34 56 78",
  // })

  // États pour le chargement et les messages
  const [isSubmittingStore, setIsSubmittingStore] = useState(false)
  const [isSubmittingPersonal, setIsSubmittingPersonal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // const handleStoreInfoChange = (e) => {
  //   const { name, value } = e.target
  //   setStoreInfo(prev => ({ ...prev, [name]: value }))
  // }

  const handleStoreInfoChange = (e) => {
    const { name, value } = e.target
    setStoreInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({ ...prev, [name]: value }))
  }
const vendorId=2
  // const handleSubmit = (isStore) => async (e) => {
  //   e.preventDefault()
  //   const submitHandler = isStore ? setIsSubmittingStore : setIsSubmittingPersonal
  //   submitHandler(true)

  //   // Simulation d'envoi de données
  //   await new Promise(resolve => setTimeout(resolve, 1000))

  //   submitHandler(false)
  //   setShowSuccess(true)
  //   setTimeout(() => setShowSuccess(false), 3000)
  // }
  const handleSubmit = (isStore) => async (e) => {
  e.preventDefault();
  const dataToSend = isStore ? storeInfo : personalInfo;
  console.log("Données envoyées :", dataToSend);

  const endpoint = isStore 
    ? `http://localhost:4000/api/v1/boutiques/update/${vendorId}`
    : `http://localhost:4000/api/v1/users/update/${vendorId}`; // exemple

  try {
    if (isStore) setIsSubmittingStore(true);
    else setIsSubmittingPersonal(true);

    await axios.put(endpoint, dataToSend);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (err) {
    console.error("Erreur de mise à jour :", err.response?.data || err.message);
  } finally {
    if (isStore) setIsSubmittingStore(false);
    else setIsSubmittingPersonal(false);
  }
};


  

 useEffect(() => {
  axios.get(`http://localhost:4000/api/v1/boutiques/get/${vendorId}`)
    .then((res) => {
      console.log("Réponse API:", res.data); // Ajoute ce log pour voir la structure
      if (Array.isArray(res.data) && res.data.length > 0) {
        setStoreInfo(res.data[0]);
      } else if (res.data.boutiqueDetails) {
        setStoreInfo(res.data.boutiqueDetails[0])
      } else {
        console.warn("Aucune donnée de boutique trouvée");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des infos :", error);
    });
}, []);

 useEffect(() => {
  axios.get(`http://localhost:4000/api/v1/users/getinfosV/${vendorId}`)
    .then((res) => {
      console.log("Réponse API:", res.data); // Ajoute ce log pour voir la structure
      if (Array.isArray(res.data) && res.data.length > 0) {
        setPersonalInfo(res.data[0]);
      } else if (res.data.userDetails) {
        setPersonalInfo(res.data.userDetails[0])
      } else {
        console.warn("Aucune donnée personnelles trouvée");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des infos :", error);
    });
}, []);


  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      {/* Message de succès */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Modifications enregistrées avec succès !
        </div>
      )}

      {/* Navigation */}
      <div className="grid grid-cols-2 bg-gray-100 rounded-lg w-full">
        {[
          { id: 'store', icon: Store, label: 'Boutique' },
          { id: 'personal', icon: User, label: 'Personnel' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 py-1 px-4 ${
              activeTab === tab.id 
                ? "text-black bg-white m-1" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Onglet Boutique */}
      {activeTab === 'store' && (
        <form onSubmit={handleSubmit(true)} className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Store className="h-5 w-5" /> Informations de la boutique
            </h2>
            <p className="text-gray-500 text-sm">Modifiez les informations de votre boutique</p>
          </div>

          <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom de la boutique</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="name"
                  value={storeInfo.name || ""}
                  onChange={handleStoreInfoChange}
                  // onChange={(e) => setStoreInfo({...storeInfo, name: e.target.value})}

                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="description"
                  value={storeInfo.description || ""}
                  // value="hahahaha"
                  onChange={handleStoreInfoChange}
                  // onChange={(e) => setStoreInfo({...storeInfo, description: e.target.value})}

                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Adresse</label>
              <input
                className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                name="address"
                value={storeInfo.address || ""}
                onChange={handleStoreInfoChange}
                  // onChange={(e) => setStoreInfo({...storeInfo, address: e.target.value})}

              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ville</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="city"
                  value={storeInfo.city || ""}
                  onChange={handleStoreInfoChange}
                  // onChange={(e) => setStoreInfo({...storeInfo, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Code postal</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="postalCode"
                  value={storeInfo.postalCode || ""}
                  onChange={handleStoreInfoChange}
                  // onChange={(e) => setStoreInfo({...storeInfo, postalCode: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pays</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  name="country"
                  value={storeInfo.country || ""}
                  onChange={handleStoreInfoChange}
                  // onChange={(e) => setStoreInfo({...storeInfo, country: e.target.value})}
                >
                  <option value="Algerie">Algerie</option>
                  <option value="France">France</option>
                  <option value="Canada">Canada</option>
                  <option value="Maroc">Maroc</option>
                </select>
              </div>
            </div>

      

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <label className="block text-sm font-medium mb-1">Statut de la boutique</label>
                <p className="text-sm text-gray-500">
                  Lorsque désactivée, votre boutique ne sera pas visible pour les clients
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
               <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={storeInfo.statut === "active"} 
                  onChange={(e) => {
                    setStoreInfo(prev => ({
                      ...prev,
                      statut: e.target.checked ? "active" : "inactive"
                    }))
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#fcb63d] peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <button
              type="submit"
              className={`bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-4 py-2 rounded-md flex items-center gap-2 ${
                isSubmittingStore ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isSubmittingStore}
            >
              {isSubmittingStore ? (
                <span className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enregistrement...
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Onglet Personnel */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSubmit(false)} className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
              <User className="h-5 w-5" /> Informations personnelles
            </h2>
            <p className="text-gray-500 text-sm">Modifiez vos informations personnelles</p>
          </div>

          <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Prénom</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="firstName"
                  value={personalInfo.firstName || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="lastName"
                  value={personalInfo.lastName || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  type="email"
                  name="email"
                  value={personalInfo.email || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <input
                  className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                  name="phone"
                  value={personalInfo.phone || ""}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nouveau Mot de passe</label>
              <input
                className="w-full p-2 border rounded-md focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A] "
                type="password"
                placeholder="••••••••"
              />
               <label className="block text-sm font-medium mt-2 mb-2">Confirmer le Mot de passe</label>
              <input
                className="focus:ring-[#fcb63d] focus:outline-none focus:ring-1  focus:border-[#FAA61A]  w-full p-2 border rounded-md"
                type="password"
                
                placeholder="••••••••"
              />
              <p className="text-sm text-gray-500 mt-2">
                Laissez vide si vous ne souhaitez pas changer votre mot de passe
              </p>
            </div>

            <button
              type="submit"
              className={`bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-4 py-2 rounded-md flex items-center gap-2 ${
                isSubmittingPersonal ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isSubmittingPersonal}
            >
              {isSubmittingPersonal ? (
                <span className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enregistrement...
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}