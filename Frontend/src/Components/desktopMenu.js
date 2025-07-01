import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; // adjust the path if needed
import "../App.css";

const DesktopMenu = ({ onCartClick }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/"); // redirect after logout
  };

  return (
    <div className="desktop-menu-container">
      <Link to="/product" className="menu-item">Shop</Link>
      <Link to="/contact" className="menu-item">Contact</Link>

      {!user ? (
        <Link to="/signin" className="menu-item">Sign in</Link>
      ) : (
        <div className="menu-item" onClick={handleSignOut} style={{ cursor: "pointer" }}>
          Sign out
        </div>
      )}

      <div
        className="menu-item"
        onClick={onCartClick}
        style={{ cursor: "pointer" }}
      >
        Cart
      </div>
    </div>
  );
};

export default DesktopMenu;
