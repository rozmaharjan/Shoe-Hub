import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
} from "../../apis/api";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = () => {
    getAllProductsApi()
      .then((res) => {
        if (res.data && res.data.products) {
          setProducts(res.data.products);
          localStorage.setItem("products", JSON.stringify(res.data.products));
        } else {
          toast.error("No products found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setProductName("");
          setProductPrice("");
          setProductDescription("");
          setProductCategory("");
          setProductImage(null);
          setPreviewImage(null);
          const updatedProducts = [...products, res.data.product];
          setProducts(updatedProducts);
          localStorage.setItem("products", JSON.stringify(updatedProducts));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) {
      return;
    }
    deleteProductApi(id)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          const updatedProducts = products.filter((product) => product._id !== id);
          setProducts(updatedProducts);
          localStorage.setItem("products", JSON.stringify(updatedProducts));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      });
  };

  return (
    <>
      <div style={dashboardContainerStyle}>
        <div style={headerStyle}>
          <h1>Admin Dashboard</h1>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
            style={addProductButtonStyle}
          >
            Add Product
          </button>
        </div>

        <div
          className="modal fade"
          id="addProductModal"
          tabIndex="-1"
          aria-labelledby="addProductModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={modalContentStyle}>
              <div className="modal-header" style={modalHeaderStyle}>
                <h5 className="modal-title" id="addProductModalLabel">
                  Create a New Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Product Name</label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      className="form-control"
                      type="text"
                      placeholder="Enter product name"
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Product Description</label>
                    <textarea
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="form-control"
                      placeholder="Enter description"
                      rows="4"
                      required
                      style={inputStyle}
                    ></textarea>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Price</label>
                    <input
                      onChange={(e) => setProductPrice(e.target.value)}
                      type="number"
                      className="form-control"
                      placeholder="Enter price"
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Select Category</label>
                    <select
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="form-control"
                      required
                      style={inputStyle}
                    >
                      <option value="">Select Category</option>
                      <option value="featured">Featured</option>
                      <option value="popular">Popular Products</option>
                    </select>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Product Image</label>
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      className="form-control"
                      accept="image/*"
                      style={inputStyle}
                    />
                  </div>

                  {previewImage && (
                    <div style={imagePreviewContainerStyle}>
                      <img
                        src={previewImage}
                        className="img-fluid rounded"
                        alt="Preview"
                        style={imagePreviewStyle}
                      />
                    </div>
                  )}

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      style={modalButtonStyle}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={modalButtonStyle}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover mt-4" style={tableStyle}>
          <thead className="table-primary">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id} style={tableRowStyle}>
                <td>
                  <img
                    src={item.productImageUrl}
                    alt="Product"
                    style={productImageStyle}
                  />
                </td>
                <td>{item.productName}</td>
                <td>${item.productPrice}</td>
                <td>{item.productCategory}</td>
                <td>{item.productDescription.length > 50 ? item.productDescription.slice(0, 50) + '...' : item.productDescription}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link
                      to={`/admin/edit/${item._id}`}
                      className="btn btn-sm btn-outline-success"
                      style={actionButtonStyle}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-outline-danger"
                      style={actionButtonStyle}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;

const dashboardContainerStyle = {
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "10px",
  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const addProductButtonStyle = {
  backgroundColor: "#007bff",
  border: "none",
  color: "#fff",
  borderRadius: "4px",
  padding: "12px 24px",
  fontSize: "16px",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  cursor: "pointer",
};

const formGroupStyle = {
  marginBottom: "20px",
};

const inputStyle = {
  borderRadius: "6px",
  boxShadow: "none",
  padding: "12px",
  border: "1px solid #dee2e6",
};

const labelStyle = {
  fontWeight: "500",
  marginBottom: "8px",
};

const modalContentStyle = {
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const modalHeaderStyle = {
  borderBottom: "1px solid #dee2e6",
  backgroundColor: "#f1f3f5",
};

const modalButtonStyle = {
  borderRadius: "6px",
  fontSize: "16px",
  padding: "12px 24px",
};

const imagePreviewContainerStyle = {
  marginTop: "15px",
};

const imagePreviewStyle = {
  maxHeight: "200px",
  width: "100%",
  objectFit: "cover",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
};

const tableStyle = {
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "#fff",
  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
};

const tableRowStyle = {
  transition: "background-color 0.3s ease",
  cursor: "pointer",
};

const productImageStyle = {
  height: "60px",
  width: "60px",
  objectFit: "cover",
  borderRadius: "6px",
};

const actionButtonStyle = {
  borderRadius: "6px",
  padding: "8px 14px",
  margin: "0 4px",
  transition: "background-color 0.3s ease, color 0.3s ease",
};
