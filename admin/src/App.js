import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AddFlower from './components/AddFlower';
import FlowerList from './components/FlowerList';
import './App.css';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <span className="admin-tab-red">Admin Panel</span>
      <nav>
        <Link
          to="/flowers"
          className={`admin-tab admin-tab-grey ${location.pathname === '/flowers' || location.pathname === '/' ? 'active-tab' : ''}`}
        >
          Flowers
        </Link>
        <Link
          to="/add-flower"
          className={`admin-tab admin-tab-black ${location.pathname === '/add-flower' ? 'active-tab' : ''}`}
        >
          Add Flowers
        </Link>
      </nav>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <div className="admin-container">
        <Header />
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
