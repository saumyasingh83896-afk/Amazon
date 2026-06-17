import React, { useState } from 'react';
import ProductCard from '../Components/ProductCard';
import './Home.css';

function Home({ addToCart, onNavigate, setSelectedProduct }) {
  const products = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      price: 159900,
      originalPrice: 179900,
      rating: 4.8,
      reviews: 12500,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
      category: "Electronics",
      discount: "11% off"
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      price: 29990,
      originalPrice: 39990,
      rating: 4.7,
      reviews: 8500,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      category: "Electronics",
      discount: "25% off"
    },
    {
      id: 3,
      name: "Men's Casual Shirt",
      price: 999,
      originalPrice: 1999,
      rating: 4.5,
      reviews: 3200,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      category: "Fashion",
      discount: "50% off"
    },
    {
      id: 4,
      name: "Women's Maxi Dress",
      price: 1499,
      originalPrice: 2999,
      rating: 4.6,
      reviews: 2800,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
      category: "Fashion",
      discount: "50% off"
    },
    {
      id: 5,
      name: "The Alchemist Book",
      price: 299,
      originalPrice: 499,
      rating: 4.9,
      reviews: 15000,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      category: "Books",
      discount: "40% off"
    },
    {
      id: 6,
      name: "Samsung 55\" 4K TV",
      price: 54990,
      originalPrice: 84990,
      rating: 4.7,
      reviews: 4200,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      category: "Electronics",
      discount: "35% off"
    },
    {
      id: 7,
      name: "Smart Watch Pro",
      price: 3999,
      originalPrice: 9999,
      rating: 4.4,
      reviews: 1800,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
      category: "Electronics",
      discount: "60% off"
    },
    {
      id: 8,
      name: "Running Shoes",
      price: 2499,
      originalPrice: 4999,
      rating: 4.5,
      reviews: 5600,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Fashion",
      discount: "50% off"
    },
    {
      id: 9,
      name: "Wireless Mouse",
      price: 599,
      originalPrice: 1299,
      rating: 4.3,
      reviews: 8900,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      category: "Electronics",
      discount: "54% off"
    },
    {
      id: 10,
      name: "Gaming Keyboard",
      price: 2499,
      originalPrice: 4999,
      rating: 4.6,
      reviews: 3400,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
      category: "Electronics",
      discount: "50% off"
    },
    {
      id: 11,
      name: "Yoga Mat",
      price: 799,
      originalPrice: 1999,
      rating: 4.4,
      reviews: 2100,
      image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400",
      category: "Fashion",
      discount: "60% off"
    },
    {
      id: 12,
      name: "Coffee Maker",
      price: 3499,
      originalPrice: 6999,
      rating: 4.7,
      reviews: 5600,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
      category: "Electronics",
      discount: "50% off"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Electronics', 'Fashion', 'Books'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    onNavigate('product');
  };

  return (
    <div className="home">
      {/* Hero Banner */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Amazon.in</h1>
          <p>Everything you need, delivered to your doorstep</p>
          <button className="shop-now-btn" onClick={() => {
            document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
          }}>
            Shop Now →
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section" id="categories-section">
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="products-section" id="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>{filteredProducts.length} products found</p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;