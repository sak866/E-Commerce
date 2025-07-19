// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div>
      <h2>Product Catalog</h2>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Home;

// src/pages/Login.js
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert("Login functionality to be integrated with backend security.");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios.post("http://localhost:8080/auth/register", {
      username,
      email,
      password,
    }).then(() => {
      alert("Registered successfully! Please login.");
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;

// src/pages/Cart.js
import React from "react";

function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    alert("Redirect to payment gateway or integrate Razorpay checkout here.");
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name} - ₹{item.price} x {item.quantity}</p>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;

// src/pages/Admin.js
import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    axios.post("http://localhost:8080/products/admin", {
      name,
      description: desc,
      price: parseFloat(price),
    }).then(() => {
      alert("Product added!");
    });
  };

  return (
    <div>
      <h2>Admin - Add Product</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
      <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} /><br/>
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br/>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default Admin;
