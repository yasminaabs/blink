import { useState, useEffect } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';


export default function AddProductForm({ product, onClose, onSave }) {
 
  const [subCategories, setSousCategories] = useState([]);
  const [mainCategories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);



  // État initial basé sur le produit existant ou des valeurs par défaut
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    mainCategory: product?.mainCategory || '',
    subCategory: product?.subCategory || '',
    description: product?.description || '',
    stock: product?.stock || '',
    stockStatus: product?.stock > 0 ? "En stock" : "Rupture"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
  
    
    if (formData.name.length >30) {
      newErrors.name = "Maximum 30 caractères";
    }
    
    if (formData.price && (formData.price < 0.01 || formData.price > 10000)) {
      newErrors.price = "Prix invalide (0.01€ - 10 000€)";
    }
    
    if (formData.stock < 0 || formData.stock > 100000) {
      newErrors.stock = "Stock invalide (0 - 100 000)";
    }
    
    if (formData.description.length > 100) {
      newErrors.description = "Maximum 100 caractères";
    }
    
    setErrors(newErrors);
  }, [formData]);

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.price || !formData.mainCategory || !formData.subCategory || !formData.stock) {
    alert("Veuillez remplir tous les champs obligatoires");
    return;
  }

  const payload = {
    titre: formData.name,
    description: formData.description,
    prix: formData.price,
    categorie_nom: formData.mainCategory,
    sous_categorie_nom: formData.subCategory,
    stock: formData.stock,
  };

  try {
    const res = await axios.post('http://localhost:4000/api/v1/articles/create', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Produit ajouté avec succès', res.data);
    alert('Produit ajouté avec succès');
    onSave(res.data);

  } catch (err) {
    console.error('Erreur lors de l\'enregistrement du produit :', err);
    alert("Erreur lors de l'ajout du produit. Veuillez réessayer.");
  }
};



  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/categories/getNomSC`)
      .then((res) => setSousCategories(res.data.data)) // ← ici on accède à "data"
      .catch((err) => console.error("Erreur de chargement des catégories :", err))
  }, [])
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/categories/getall`)
      .then((res) => setCategories(res.data.data)) // ← ici on accède à "data"
      .catch((err) => console.error("Erreur de chargement des catégories :", err))
  }, [])

  useEffect(() => {
  axios.get('http://localhost:4000/api/v1/tailles/getall')
    .then((response) => {
      const formattedSizes = response.data.data.map((item) => ({
        label: item.taille,
        selected: false,
      }));
      setSizes(formattedSizes);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des tailles :', error);
    });
}, []);


  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          {product ? "Modifier le produit" : "Ajouter un nouveau produit"}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form action="/dashbordvendeur" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nom du produit*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]"
              required
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

                {/* Catégorie principale */}
                <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Catégorie principale*</label>
            <select
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]"
              required
            >
           <option value=""></option>
             
              { mainCategories.map((categories, index) => (
                <option key={index} value={categories.nom}>
                  {categories.nom}
                </option>
              )) }
            </select>
          </div>

          {/* Sous-catégorie */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sous-catégorie*</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]"
              required
            >
              <option value=""></option>
            
              { subCategories.map((categorie, index) => (
                <option key={index} value={categorie.nom}>
                  {categorie.nom}
                </option>
              )) }
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Prix (€)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]"
              required
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Stock*</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]"
              required
            />
            {errors.stock && <span className="text-red-500 text-sm">{errors.stock}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA61A]"
          />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>

    

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>

          <button
              type="submit"
              className={`px-4 py-2 ${
    Object.keys(errors).length > 0
      ? 'bg-gray-300 cursor-not-allowed'
      : 'bg-[#fcb63d] hover:bg-[#FAA61A]'
  } text-white rounded-lg transition-colors`}
  disabled={Object.keys(errors).length > 0}
            >
  {product ? "Mettre à jour" : "Ajouter"}
</button>
        </div>
      </form>
    </div>
  );
}
