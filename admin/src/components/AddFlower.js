import React, { useState } from 'react';
import axios from 'axios';
import './AddFlower.css';
import { toast } from 'react-toastify';

const AddFlower = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      <p className="admin-footer">
        Flower Delivery App built for ElevateHER Innovation Space by <strong>Salma Abdullahi</strong>
      </p>
    </div>
  );
};

export default AddFlower;
