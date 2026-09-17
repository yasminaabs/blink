import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/client/Navbar';
import PromoBanner from '../components/client/Promo';
import Sidebar from '../components/client/sidebar';
import AccountHeader from '../components/client/acountheader';
import Footer from '../components/client/footer';
import AddressForm from '../components/client/adress';
import WishlistItems from '../components/client/wishlist';
import AccountDetailsForm from '../components/client/info';
import OrdersList from '../components/client/orders';
import StoreContent from '../components/client/creatstore';
function DashbordClient() {
    const [activeSection, setActiveSection] = useState("orders");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const modalRef = useRef(null);

    // Fonctions de déconnexion
    const handleLogout = () => setShowLogoutConfirm(true);
    const confirmLogout = () => {
        alert("Déconnexion réussie");
        setShowLogoutConfirm(false);
    };

    // Fermer le modal quand on clique à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowLogoutConfirm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <PromoBanner />
            <Navbar />
            <AccountHeader />

            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar 
                        activeSection={activeSection} 
                        setActiveSection={setActiveSection} 
                        onLogout={handleLogout} 
                    />

                    <div className="flex-1 bg-white px-6 py-6 rounded-lg border border-gray-200">
                        {activeSection === "orders" && <OrdersList />}
                        {activeSection === "wishlist" && < WishlistItems/>}
                        {activeSection === "address" && <AddressForm/>}
                        {activeSection === "details" && <AccountDetailsForm />}
                        {activeSection === "store" && <StoreContent/>}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal de confirmation de déconnexion */}
            {showLogoutConfirm && (
                <div 
                    style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(107, 114, 128, 0.5)',
                    }}
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                >
                    <div 
                        ref={modalRef}
                        className="bg-white rounded-lg shadow-xl max-w-md w-full"
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Confirmer la déconnexion</h3>
                            <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="px-4 py-2 cursor-pointer bg-[#fcb63d] hover:bg-[#FAA61A] text-white rounded-md"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashbordClient;