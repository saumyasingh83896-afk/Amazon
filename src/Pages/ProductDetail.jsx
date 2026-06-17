import React from 'react';
import './ProductDetail.css';

function ProductDetail({ product, addToCart, onNavigate }) {
  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Product not found</h2>
        <button onClick={() => onNavigate('home')}>Back to Home</button>
      </div>
    );
  }

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <button className="back-button" onClick={() => onNavigate('home')}>
          ← Back to Shopping
        </button>
        
        <div className="product-detail-layout">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            {product.discount && (
              <span className="discount-badge-large">{product.discount}</span>
            )}
          </div>
          
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            
            <div className="rating-section">
              <div className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="rating-value">{product.rating} out of 5</span>
              <span className="reviews-count">({product.reviews.toLocaleString()} ratings)</span>
            </div>
            
            <div className="price-section">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="save-price">
                    You save: ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
            
            <div className="delivery-info">
              <p>📦 <strong>FREE delivery</strong> by {getDeliveryDate()}</p>
              <p>✅ In stock - Available for immediate delivery</p>
            </div>
            
            <div className="product-actions">
              <button 
                className="add-to-cart-btn-large"
                onClick={() => {
                  addToCart(product);
                  onNavigate('cart');
                }}
              >
                🛒 Add to Cart
              </button>
              <button 
                className="buy-now-btn"
                onClick={() => {
                  addToCart(product);
                  onNavigate('checkout');
                }}
              >
                Buy Now →
              </button>
            </div>
            
            <div className="product-features">
              <h3>Product Details:</h3>
              <ul>
                <li>✓ Premium quality product</li>
                <li>✓ 1 year warranty</li>
                <li>✓ Free shipping across India</li>
                <li>✓ Easy returns within 7 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;