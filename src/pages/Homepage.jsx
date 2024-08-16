import React from 'react';
import Products from './Products';

const Homepage = () => {
  // Inline styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      margin: 0,
      padding: 0,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ff6f61',
      color: '#fff',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1rem',
    },
    navLinkHover: {
      textDecoration: 'underline',
    },
    heroSection: {
      textAlign: 'center',
      padding: '80px 20px',
      backgroundColor: '#f9f9f9',
      backgroundImage: 'url("https://cdn.wallpapersafari.com/3/70/7FxNO8.jpg")', // Example background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
    },
    heroTitle: {
      fontSize: '3rem',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginBottom: '30px',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '15px 30px',
      fontSize: '1.2rem',
      color: '#fff',
      backgroundColor: '#ff6f61',
      textDecoration: 'none',
      borderRadius: '5px',
      transition: 'background 0.3s ease, transform 0.3s ease',
      transform: 'scale(1)',
    },
    ctaButtonHover: {
      backgroundColor: '#ff5a4d',
      transform: 'scale(1.05)',
    },
    productsSection: {
      padding: '20px',
    },
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
    },
    footerLinks: {
      marginTop: '10px',
    },
    footerLink: {
      color: '#fff',
      textDecoration: 'none',
      margin: '0 10px',
      transition: 'text-decoration 0.3s ease',
    },
    footerLinkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      

      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to Shoe Hub</h1>
        <p style={styles.heroSubtitle}>Discover the latest trends in footwear.</p>
      </section>

      <div style={styles.productsSection}>
        <Products />
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2024 Shoe Hub. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a href="#privacy" style={styles.footerLink} onMouseOver={(e) => e.target.style.textDecoration = styles.footerLinkHover.textDecoration} onMouseOut={(e) => e.target.style.textDecoration = ''}>Privacy Policy</a>
          <a href="#terms" style={styles.footerLink} onMouseOver={(e) => e.target.style.textDecoration = styles.footerLinkHover.textDecoration} onMouseOut={(e) => e.target.style.textDecoration = ''}>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
