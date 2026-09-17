import React, { useState } from 'react';
import { Plus, AlertTriangle, Check } from 'lucide-react';

const StoreContent = () => {
  const [hasStore, setHasStore] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateStore = () => {
    setIsCreating(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler un délai de traitement
    setTimeout(() => {
      setHasStore(true);
      setIsCreating(false);
      setFormSubmitted(true);

      // Masquer le message de succès après 3 secondes
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }, 1000);
  };

  if (!hasStore && !isCreating) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 max-w-3xl mx-auto">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <Plus className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Vous n'avez pas encore de boutique</h3>
          <p className="text-gray-500 mb-6">Créez votre boutique pour commencer à vendre vos produits sur BLINK.</p>
          <button
            onClick={handleCreateStore}
            className="inline-flex items-center gap-2 bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-6 py-3 rounded-md transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Créer ma boutique
          </button>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Créer votre boutique</h2>

          {formSubmitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <div>Votre boutique a été créée avec succès!</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8 border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Informations de la boutique</h3>
              <p className="text-gray-600 mb-6">Gérez les informations de base de votre boutique</p>

              <div className="mb-4">
                <label htmlFor="storeName" className="block text-gray-700 mb-2">
                  Nom de la boutique
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  placeholder="Ma Boutique de Mode"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#c41c4e] focus:border-[#c41c4e]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Vêtements tendance pour tous les styles"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#c41c4e] focus:border-[#c41c4e]"
                  rows={3}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email de contact
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@maboutique.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#c41c4e] focus:border-[#c41c4e]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 1 23 45 67 89"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#c41c4e] focus:border-[#c41c4e]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors mr-3 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-1 bg-[#f5a623] text-white rounded-md hover:bg-[#e69819] transition-colors cursor-pointer"
              >
                Enregistrer les informations
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Affichage après création de la boutique
  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tableau de Bord Boutique</h2>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Check className="w-3 h-3 mr-1" />
              Boutique active
            </span>
          </div>
        </div>

        {formSubmitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <Check className="w-5 h-5 mr-2" />
            <div>Votre boutique a été créée avec succès!</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        

      
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 ">
        <div className="text-center py-8">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <Plus className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ajoutez votre premier article</h3>
          <p className="text-gray-500 mb-6">Commencez à vendre en ajoutant des articles à votre boutique.</p>
          <button className="inline-flex items-center gap-2 bg-[#fcb63d] hover:bg-[#FAA61A] text-white px-6 py-3 rounded-md  transition-colors cursor-pointer">
            <Plus className="w-5 h-5" />
            Ajouter un article
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreContent;