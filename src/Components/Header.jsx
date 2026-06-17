import React, { useState } from 'react';
import './Header.css';

function Header({ cartCount, onNavigate, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        
        {/* Logo */}
        <div className="logo" onClick={() => onNavigate('home')}>
          <span className="logo-text">AMAZON</span>
          <span className="logo-dot">.in</span>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button onClick={() => setIsMenuOpen(false)}>✕</button>
          </div>
          <div className="mobile-menu-links">
            <div className="mobile-nav-option" onClick={() => {
              onNavigate('home');
              setIsMenuOpen(false);
            }}>🏠 Home</div>
            <div className="mobile-nav-option" onClick={() => {
              onNavigate('cart');
              setIsMenuOpen(false);
            }}>🛒 Cart ({cartCount})</div>
            <div className="mobile-nav-option">👤 Account</div>
            <div className="mobile-nav-option">📦 Orders</div>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="delivery-location">
          <span className="delivery-line1">Deliver to</span>
          <span className="delivery-line2">📍 India</span>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <select className="search-select">
            <option>All</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Fashion</option>
          </select>
          <input type="text" placeholder="Search Amazon.in" />
          <button>🔍</button>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <div className="nav-option">
            <span className="nav-line1">Hello, Sign in</span>
            <span className="nav-line2">Account & Lists</span>
          </div>
          <div className="nav-option">
            <span className="nav-line1">Returns</span>
            <span className="nav-line2">& Orders</span>
          </div>
          <div className="cart" onClick={() => onNavigate('cart')}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
            <span className="cart-text">Cart</span>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="categories-bar">
        <div className="categories-bar-container">
          <span>Today's Deals</span>
          <span>Customer Service</span>
          <span>Best Sellers</span>
          <span>New Releases</span>
          <span>Gift Cards</span>
          <span>Sell</span>
        </div>
      </div>
    </header>
  );
}

export default Header;