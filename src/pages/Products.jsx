import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductsApi } from '../apis/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProductsApi();
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      } else {
        console.error('No products found in response');
        setError('No products found');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  if (loading) return <div style={styles.loader}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.productsPage}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>What's New?</h2>
          <div style={styles.productsGrid}>
            {products
              .filter((product) => product.productCategory === 'featured')
              .map((product) => (
                <div
                  key={product._id}
                  style={styles.productCard}
                  onClick={() => handleCardClick(product._id)}
                >
                  <div style={styles.productImageWrapper}>
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      style={styles.productImage}
                    />
                  </div>
                  <div style={styles.productDetails}>
                    <h3 style={styles.productName}>{product.productName}</h3>
                    <p style={styles.productPrice}>NPR {product.productPrice}</p>
                    <p style={styles.productDescription}>
                      {product.productDescription}
                    </p>
                  </div>
                  <button
                    style={styles.viewDetailsButton}
                    onClick={() => handleCardClick(product._id)}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Trending Products</h2>
          <div style={styles.productsGrid}>
            {products
              .filter((product) => product.productCategory === 'popular')
              .map((product) => (
                <div
                  key={product._id}
                  style={styles.productCard}
                  onClick={() => handleCardClick(product._id)}
                >
                  <div style={styles.productImageWrapper}>
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      style={styles.productImage}
                    />
                  </div>
                  <div style={styles.productDetails}>
                    <h3 style={styles.productName}>{product.productName}</h3>
                    <p style={styles.productPrice}>NPR {product.productPrice}</p>
                    <p style={styles.productDescription}>
                      {product.productDescription}
                    </p>
                  </div>
                  <button
                    style={styles.viewDetailsButton}
                    onClick={() => handleCardClick(product._id)}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  productsPage: {
    fontFamily: '"Arial", sans-serif',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
    borderBottom: '3px solid #007bff',
    paddingBottom: '15px',
    textTransform: 'uppercase',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '15px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  productImageWrapper: {
    height: '200px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '12px',
    marginBottom: '15px',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  productDetails: {
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  productPrice: {
    fontSize: '1.125rem',
    color: '#007bff',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    textAlign: 'center',
  },
  viewDetailsButton: {
    marginTop: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  viewDetailsButtonHover: {
    backgroundColor: '#0056b3',
  },
  loader: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#007bff',
    marginTop: '50px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#d9534f',
    marginTop: '50px',
  },
};

export default Products;
