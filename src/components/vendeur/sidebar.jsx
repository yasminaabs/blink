import React from "react";
import { 
  LayoutGrid, 
  ClipboardList, 
  Users, 
  Star, 
  ShoppingBag, 
  AlertTriangle, 
  Settings
} from "lucide-react";

const AdminSidebar = ({ activeView, setActiveView, isOpen }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "Articles", label: "Articles", icon: ShoppingBag },
    { id: "Commandes", label: "Commandes", icon: ClipboardList },
    { id: "reviews", label: "Reviews", icon: Star },
  
    { id: "Parametres", label: "Parametres", icon: Settings },
  ];

  return (
    <div 
      className={`
        ${isOpen ? "w-55" : "w-0 md:w-16"} 
        h-full
        fixed md:relative
        z-40
        transition-all duration-300 
        border-r border-gray-200 
        bg-white 
        overflow-hidden
        
        pt-7

      `}
    >
    
    
      <nav className="mt-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`
                flex w-full items-center gap-3 
                rounded-lg px-3 py-3 
                text-sm font-medium
                transition-colors duration-200
                ${activeView === item.id 
                  ? "bg-orange-50 text-orange-700 shadow-inner" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
                ${!isOpen ? "justify-center" : ""}
              `}
              onClick={() => setActiveView(item.id)}
              aria-label={isOpen ? item.label : item.id}
            >
              <Icon className={`h-5 w-5 ${activeView === item.id ? "text-orange-500" : "text-gray-500"}`} />
              {isOpen && (
                <span className="whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Version réduite - Tooltips */}
      {!isOpen && (
        <div className="hidden md:block">
          {navItems.map((item) => (
            <div 
              key={item.id}
              className="absolute left-16 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ top: `calc(6rem + ${navItems.indexOf(item) * 3.5}rem)` }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;