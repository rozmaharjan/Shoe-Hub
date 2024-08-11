import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSingleProductApi } from "../apis/api";
import "../styles/productDetails.css";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '' });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to continue");
      navigate('/login?error=true');
    } else {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const res = await getSingleProductApi(productId);
      if (res.data.success) {
        setProductDetails(res.data.product);
      } else {
        toast.error("Failed to fetch product details");
      }
    } catch (error) {
      toast.error("An error occurred while fetching product details");
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!bookingForm.name) errors.name = "Name is required";
    if (!bookingForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(bookingForm.email)) errors.email = "Email is invalid";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBooking = () => {
    if (!validateForm()) return;
    // Logic to handle product booking
    setIsBooked(true);
    setShowBookingModal(false);
    toast.success("Product booked successfully!");
  };

  const handleChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!productDetails) {
    return <div className="error">Product not found.</div>;
  }

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-carousel">
          <img src={productDetails.productImageUrl} alt={productDetails.productName} />
          {/* Add carousel controls and multiple images if needed */}
        </div>
        <div className="product-info">
          <h2>{productDetails.productName}</h2>
          <p className="price">NPR {productDetails.productPrice}</p>
          <p>{productDetails.productDescription}</p>
          <p className="category">Category: {productDetails.productCategory}</p>
          <button
            className={`book-now ${isBooked ? 'booked' : ''}`}
            onClick={() => setShowBookingModal(true)}
            disabled={isBooked}
          >
            {isBooked ? "Already Booked" : "Book Now"}
          </button>
        </div>
      </div>
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBooking}
          bookingForm={bookingForm}
          handleChange={handleChange}
          formErrors={formErrors}
        />
      )}
    </div>
  );
};

const BookingModal = ({ onClose, onConfirm, bookingForm, handleChange, formErrors }) => {
  return (
    <div className="booking-modal" role="dialog" aria-labelledby="booking-modal-title" aria-modal="true">
      <h2 id="booking-modal-title">Confirm Booking</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={bookingForm.name}
        onChange={handleChange}
        placeholder="Your Name"
        aria-required="true"
        className={formErrors.name ? 'error' : ''}
      />
      {formErrors.name && <p className="error-text">{formErrors.name}</p>}
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={bookingForm.email}
        onChange={handleChange}
        placeholder="Your Email"
        aria-required="true"
        className={formErrors.email ? 'error' : ''}
      />
      {formErrors.email && <p className="error-text">{formErrors.email}</p>}
      <div className="modal-buttons">
        <button onClick={onConfirm}>Confirm Booking</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  bookingForm: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired
};

export default ProductDetailsPage;
