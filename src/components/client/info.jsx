import React, { useState } from 'react';

const AccountDetailsForm = () => {
  // États pour les données utilisateur
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com"
  });

  // États pour les données de carte
  const [cardData, setCardData] = useState({
    cardNumber: "4242 XXXX XXXX 1234",
    secretCode: "•••"
  });

  // États pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  // États pour l'interface
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Gestion des changements
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardDataChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    if (passwordError) setPasswordError("");
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des mots de passe
    if (passwordData.newPassword || passwordData.confirmPassword) {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError("Les mots de passe ne correspondent pas");
        return;
      }
    }

    setIsSubmitting(true);

    // Simulation d'appel API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Réinitialisation des champs mot de passe
      setPasswordData({
        newPassword: "",
        confirmPassword: ""
      });

      // Masquer le message de succès après 3 secondes
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex-1">
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
          Modifications enregistrées avec succès !
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colonne gauche - Détails du compte */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Détails du Compte</h2>
            
            {/* Nom complet */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 mb-2 font-medium">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName}
                onChange={handleUserDataChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleUserDataChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
                aria-required="true"
              />
            </div>

            {/* Changement de mot de passe */}
            <h3 className="text-lg font-medium mb-4">Changer le mot de passe</h3>
            
            {/* Nouveau mot de passe */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 mb-2 font-medium">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
              />
            </div>

            {/* Confirmation mot de passe */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          {/* Colonne droite - Détails de la carte */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Détails de la Carte</h2>
            
            {/* Numéro de carte */}
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 mb-2 font-medium">
                Numéro de carte
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardDataChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A] transition-colors"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
              />
            </div>

            {/* Code secret */}
            <div className="mb-6">
              <label htmlFor="secretCode" className="block text-gray-700 mb-2 font-medium">
                Code secret
              </label>
              <input
                type="password"
                id="secretCode"
                name="secretCode"
                value={cardData.secretCode}
                onChange={handleCardDataChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#fcb63d]  focus:border-[#FAA61A]transition-colors"
                placeholder="XXX"
                maxLength="3"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="mt-6">
          <button
            type="submit"
            className={` text-white px-6 py-2 rounded-md bg-[#fcb63d] hover:bg-[#FAA61A] transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
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
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;