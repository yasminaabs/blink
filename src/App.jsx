import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/common/LoginPage';
import Benefits from './components/home/Benefit';
import BestSelling from './components/home/BestSelling';
import Browse from './components/home/Browse';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import News from './components/home/News';
import Pic from './components/home/Pic';
import ProductCard from './components/home/ProductCard';
import Cart from './Pages/Cart';
import Notification from './components/common/Notification';
import ProductDetail from './Pages/ProductDetail';
import Research from "./components/home/Research";
import Dashboardadmin from './Pages/Dashboardadmin'
import DashbordClient from './Pages/DashbordClient'
import Dashbordvendeur from './Pages/Dashboardvendeur'
import CategoryPage from "./Pages/CategoryPage";



function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [messages, setMessages] = useState([]); 

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  // Function to add products to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);

    // Add new message to messages array (this will trigger the notification to reappear)
    setMessages((prevMessages) => [
      ...prevMessages,
      `Added ${product.name} to your cart!`,
    ]);
  };

  return (
    <div className="relative">
      <Navbar openLoginModal={openLoginModal} />
      <div className={`${isLoginOpen ? 'backdrop-blur-sm' : ''}`}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Pic />
                <Benefits />
                <BestSelling />
                <Browse />
                <ProductCard addToCart={addToCart} />
                <News />
                <Notification messages={messages} />
              </>
            }
          />
          <Route path="/search" element={<Research />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/dashbordadmin" element={<Dashboardadmin />} />
          <Route path="/dashbordclient" element={<DashbordClient />} />
          <Route path="/dashbordvendeur" element={<Dashbordvendeur />} />
        </Routes>
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <LoginPage closeLoginModal={closeLoginModal} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
