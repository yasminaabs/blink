import React, { useState } from 'react'
import VendeurNavbar from '../components/vendeur/nav'
import Sidebar from '../components/vendeur/sidebar'
import DashboardHome from '../components/vendeur/DashboardHome'
import ReviewsContent from '../components/vendeur/avis'
import Settings from '../components/vendeur/parametre'
import Products from '../components/vendeur/Articles'
import Orders from '../components/vendeur/Commandes'
function Dashboardvendeur() {
      const [activeView, setActiveView] = useState('dashboard');
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
      
      // Contenu dynamique basé sur la vue active
      const renderActiveView = () => {
        switch (activeView) {
          case "dashboard":
            return <DashboardHome />;
          case "Articles":
            return <Products/>; 
          case "Commandes":
            return <Orders/>; 
          case "reviews":
            return  <ReviewsContent/>; 
            case "Parametres":
                return <Settings/>; 
             
          default:
            return <DashboardHome />;
        }
      };
    
  return (
   
 <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar en haut */}
      <VendeurNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar à gauche */}
        <Sidebar
          activeView={activeView} 
          setActiveView={setActiveView} 
          isOpen={isSidebarOpen} 
        />
        
        {/* Contenu principal */}
        <main className="flex-1 overflow-auto p-6 bg-white">
        {renderActiveView()}
        </main>
      </div>
    </div>
  



  )
}

export default Dashboardvendeur