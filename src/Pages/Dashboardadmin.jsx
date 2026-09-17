import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardHome from '../components/admin/DashboardHome';
import CustomersContent from '../components/admin/CustomersContent';
import ReviewsContent from '../components/admin/ReviewsContent';
import SignalsContent from '../components/admin/SignalsContent';
import MyStoreContent from '../components/admin/MyStoreContent';
import VendeursContent from '../components/admin/VendeursContent';
function Dashboardadmin() {
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
      case "vendeurs":
        return <VendeursContent/>; 
      case "customers":
        return <CustomersContent/>; 
      case "reviews":
        return  <ReviewsContent/>; 
        case "mystore":
        return  <MyStoreContent/>; 
        case "signals":
            return <SignalsContent/>; 
         
      default:
        return <DashboardHome />;
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar en haut */}
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar à gauche */}
        <AdminSidebar 
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
  );
}

export default Dashboardadmin;