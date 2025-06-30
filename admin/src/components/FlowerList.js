import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FlowerList.css';
import { toast } from 'react-toastify';

const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/flowers`)
      .then(res => setFlowers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/flowers/${id}`)
      .then(() => {
        setFlowers(flowers.filter(f => f._id !== id));
        toast.success("Flower deleted successfully!");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to delete flower.");
      });
  };

  return (
    <div className="flower-list">
      <h2>All Flowers</h2>
      <div className="flower-grid">
        {flowers.map(flower => (
          <div key={flower._id} className="flower-card">
            <img src={`${process.env.REACT_APP_API_URL}/${flower.image}`} alt={flower.name} />
            <p><strong>Name:</strong> {flower.name}</p>
            <p><strong>Category:</strong> {flower.category}</p>
            <p><strong>Price:</strong> ${flower.price}</p>
            <p><strong>Description:</strong> {flower.description}</p>
            <button className="delete-btn" onClick={() => handleDelete(flower._id)}>Delete</button>
          </div>
        ))}
      </div>

      <p className="admin-footer">
        Flower Delivery App built for ElevateHER Innovation Space by <strong>Salma Abdullahi</strong>
      </p>
    </div>
  );
};

export default FlowerList;
