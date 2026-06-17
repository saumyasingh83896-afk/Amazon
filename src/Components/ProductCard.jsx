import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onProductClick }) {
  return (
    <div className="product-card">
      <div className="product-image" onClick={() => onProductClick(product)}>
        <img src={product.image} alt={product.name} />
        {product.discount && (
          <span className="discount-badge">{product.discount}</span>
        )}
      </div>
      <div className="product-info">
        <h3 onClick={() => onProductClick(product)}>{product.name}</h3>
        
        <div className="rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="reviews">({product.reviews.toLocaleString()})</span>
        </div>
        
        <div className="price-section">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              <span className="save-price">
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </>
          )}
        </div>
        
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;