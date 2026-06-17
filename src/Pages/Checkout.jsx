import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ cart, getCartTotal, onNavigate, clearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      onNavigate('home');
    }, 3000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="empty-checkout">
        <div className="empty-checkout-content">
          <span className="empty-icon">🛒</span>
          <h2>No items in cart</h2>
          <p>Add some items to your cart before checking out</p>
          <button className="continue-shopping-btn" onClick={() => onNavigate('home')}>
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="order-success-content">
          <span className="success-icon">🎉</span>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with us. Your order will be delivered soon.</p>
          <p className="order-id">Order ID: #{Math.random().toString(36).substr(2, 10).toUpperCase()}</p>
          <button className="continue-shopping-btn" onClick={() => onNavigate('home')}>
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  const totalWithGST = Math.round(getCartTotal() * 1.18);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <button className="back-to-cart" onClick={() => onNavigate('cart')}>
          ← Back to Cart
        </button>
        
        <h1>Checkout</h1>
        
        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Shipping Address</h3>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                required 
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea 
                name="address" 
                placeholder="Complete Address" 
                required 
                value={formData.address}
                onChange={handleChange}
              ></textarea>
              <div className="form-row">
                <input 
                  type="text" 
                  name="city" 
                  placeholder="City" 
                  required 
                  value={formData.city}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  name="pincode" 
                  placeholder="Pincode" 
                  required 
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Payment Information</h3>
              <input 
                type="text" 
                name="cardNumber" 
                placeholder="Card Number" 
                required 
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <div className="form-row">
                <input 
                  type="text" 
                  name="expiryDate" 
                  placeholder="MM/YY" 
                  required 
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  name="cvv" 
                  placeholder="CVV" 
                  required 
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <button type="submit" className="place-order-btn">
              Place Order →
            </button>
          </form>
          
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="checkout-divider"></div>
            <div className="checkout-item">
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>
            <div className="checkout-item">
              <span>Delivery:</span>
              <span className="free">FREE</span>
            </div>
            <div className="checkout-item">
              <span>GST (18%):</span>
              <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
            </div>
            <div className="checkout-total">
              <span>Total:</span>
              <span>₹{totalWithGST.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;