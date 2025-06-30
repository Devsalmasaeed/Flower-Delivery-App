import React, { useState } from 'react';
import axios from 'axios';
import './AddFlower.css';
import { toast } from 'react-toastify';
import { FaCamera } from 'react-icons/fa';

const AddFlower = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (image) data.append('image', image);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/flowers`, data);
      toast.success("Flower added successfully!");
      setFormData({ name: '', category: '', price: '', description: '' });
      setImage(null);
      setPreview(null);
    } catch (err) {
      toast.error("Failed to add flower.");
      console.error(err);
    }
  };

  return (
    <div className="add-flower-page">
      <h2>Add Flower</h2>
      <form onSubmit={handleSubmit}>
        <label>Image</label>
        <div className="image-upload-box">
          <label htmlFor="fileInput" className="upload-label">
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <div className="upload-placeholder">
                <FaCamera size={30} />
                <p>Click to upload</p>
              </div>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Fresh Flowers">Fresh Flowers</option>
              <option value="Dried Flowers">Dried Flowers</option>
              <option value="Live Plants">Live Plants</option>
              <option value="Aroma Candles">Aroma Candles</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <p className="admin-footer">
        Flower Delivery App built for ElevateHER Innovation Space by <strong>Salma Abdullahi</strong>
      </p>
    </div>
  );
};

export default AddFlower;
