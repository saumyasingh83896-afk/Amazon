import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Cart from './Components/Cart';
import Checkout from './Pages/Checkout';
import ProductDetail from './Pages/ProductDetail';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('amazonCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('amazonCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show notification
    setLastAddedItem(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Notification Component
  const Notification = () => {
    if (!showNotification) return null;
    return (
      <div className="cart-notification">
        <span>✅ {lastAddedItem?.name} added to cart!</span>
        <button onClick={() => setCurrentPage('cart')}>View Cart →</button>
      </div>
    );
  };

  return (
    <div className="app">
      <Notification />
      <Header 
        cartCount={getCartCount()} 
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      {currentPage === 'home' && (
        <Home 
          addToCart={addToCart} 
          onNavigate={setCurrentPage}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      
      {currentPage === 'cart' && (
        <Cart 
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getCartTotal={getCartTotal}
          onNavigate={setCurrentPage}
        />
      )}
      
      {currentPage === 'checkout' && (
        <Checkout 
          cart={cart}
          getCartTotal={getCartTotal}
          onNavigate={setCurrentPage}
          clearCart={() => setCart([])}
        />
      )}
      
      {currentPage === 'product' && (
        <ProductDetail 
          product={selectedProduct}
          addToCart={addToCart}
          onNavigate={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;