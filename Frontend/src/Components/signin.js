import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://backend-iq9m.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Sign in successful!");
        navigate("/"); // redirect to homepage
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Greetings!</h2>
      <h3>Welcome to Luxury Gift Shop</h3>
      <p>Use your email & password to sign in</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "CONTINUE"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>

      <div className="signin-footer">
        <Link to="#">Privacy Policy</Link>
        <span>|</span>
        <Link to="#">Terms and Conditions</Link>
      </div>
    </div>
  );
};

export default SignIn;
