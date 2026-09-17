import React from 'react';
import { 
  Heart, 
  LogOut, 
  ShoppingBag, 
  Store, 
  UserCircle, 
  MapPin 
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    {
      id: "orders",
      name: "Commandes",
      icon: ShoppingBag,
    },
    {
      id: "wishlist",
      name: "Liste de souhaits",
      icon: Heart,
    },
    {
      id: "address",
      name: "Adresse",
      icon: MapPin,
    },
    {
      id: "details",
      name: "Détails du compte",
      icon: UserCircle,
    },
    {
      id: "store",
      name: "Ma Boutique",
      icon: Store,
    },
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-lg  border border-gray-200 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                activeSection === item.id 
                   ? "bg-orange-50 text-orange-700 shadow-inner" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon 
                size={18} 
                className={activeSection === item.id ? "text-orange-500" : "text-gray-500"} 
              />
              <span>{item.name}</span>
            </button>
          );
        })}

        <button
          onClick={onLogout}
          className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;