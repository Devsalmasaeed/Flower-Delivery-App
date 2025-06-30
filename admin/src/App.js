import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddFlower from './components/AddFlower';
import FlowerList from './components/FlowerList';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="admin-container">
        <header>
          <h1>Admin Panel</h1>
          <nav>
            <Link to="/flowers">Flowers</Link>
            <Link to="/add-flower">Add Flowers</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/flowers" element={<FlowerList />} />
          <Route path="/add-flower" element={<AddFlower />} />
          <Route path="/" element={<FlowerList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
