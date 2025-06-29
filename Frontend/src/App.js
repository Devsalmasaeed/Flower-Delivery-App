import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Category from "./Components/Category";
import Category1 from "./Components/Category1"
import Category2 from "./Components/Category2"
import Category3 from "./Components/Category3"
import SignUp from "./Components/signup";

import Product from "./Components/Product";
import About from "./Components/About";
import SignIn from "./Components/signin";
import Checkout from "./Components/Checkout";
import Cart from "./Components/cart";
import Contact from "./Components/contact";
import PaymentSuccess from "./Components/PaymentSuccess"; 
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category1" element={<Category1 />} />
          <Route path="/category2" element={<Category2 />} />
          <Route path="/category3" element={<Category3 />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
