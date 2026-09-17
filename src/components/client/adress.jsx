import React, { useState } from 'react';

const AddressForm = () => {
  // État pour stocker les données de l'adresse
  const [address, setAddress] = useState({
    street: "03 bejaia, boulevard amirouche",
    city: "Bejaia",
    country: "Algerie"
  });

  // États pour gérer l'affichage
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Masquer le message de succès après 3 secondes
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-6">Adresse de Livraison</h2>

      {/* Message de succès */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
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
          Adresse mise à jour avec succès !
        </div>
      )}

      {/* Formulaire */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200 "
        aria-labelledby="address-form-title"
      >
        {/* Champ Adresse */}
        <div className="mb-4">
          <label 
            htmlFor="street" 
            className="block text-gray-700 mb-2 font-medium"
          >
            Adresse
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
            required
            aria-required="true"
          />
        </div>

        {/* Ville et Pays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Ville */}
          <div>
            <label 
              htmlFor="city" 
              className="block text-gray-700 mb-2 font-medium"
            >
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
              required
              aria-required="true"
            />
          </div>

          {/* Pays */}
          <div>
            <label 
              htmlFor="country" 
              className="block text-gray-700 mb-2 font-medium"
            >
              Pays
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
              required
              aria-required="true"
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className={` cursor-pointer bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-6 py-2 rounded-md transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </span>
          ) : (
            "Enregistrer les modifications"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;