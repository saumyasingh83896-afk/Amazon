import React from 'react';
import './Cart.css';

function Cart({ cart, updateQuantity, removeFromCart, getCartTotal, onNavigate }) {
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <span className="empty-cart-icon">🛒</span>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <button className="continue-shopping-btn" onClick={() => onNavigate('home')}>
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-subtotal">
            Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items): 
            ₹{getCartTotal().toLocaleString()}
          </p>
        </div>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-item-price-mobile">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      🗑️ Remove
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-price">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span className="free-delivery">FREE</span>
            </div>
            <div className="summary-row">
              <span>GST (18%):</span>
              <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{Math.round(getCartTotal() * 1.18).toLocaleString()}</span>
            </div>
            <p className="delivery-date">📦 Get it by {getDeliveryDate()}</p>
            <button className="checkout-btn" onClick={() => onNavigate('checkout')}>
              Proceed to Checkout →
            </button>
            <button className="continue-shopping-link" onClick={() => onNavigate('home')}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;