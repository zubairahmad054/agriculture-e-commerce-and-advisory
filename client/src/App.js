import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import New from "./pages/New";
import Formsucces from "./pages/Formsucces";
import Card from "./pages/basics/card";
import Weather from "./pages/basics/weather/weather";
import AddProducts from "./pages/basics/addProduct";
import AddBlogs from "./pages/basics/addBlog";
import FarmerProfile from "./pages/FarmerProfile";
import Landing from "./pages/Landing";
import Success from "./pages/Success";
import Blog from "./pages/basics/Blog";
import Blogs from "./pages/Blogs";
import Products from "./pages/Products";
import AllOrders from "./pages/AllOrders";
import Profile from "./pages/Profile";
import Projections from "./pages/projections";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/admin/allOrders" element={<AllOrders />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blogs/:slug" element={<Blogs />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/addBlog" element={<AddBlogs />} />
      <Route exact path="/login" element={<New />} />
      <Route path="/formsucces" element={<Formsucces />} />
      <Route path="/Card" element={<Card />} />
      <Route path="/formsucces" element={<Formsucces />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/addProduct" element={<AddProducts />} />
      <Route path="/farmerProfile" element={<FarmerProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orderSuccess" element={<Success />} />
      <Route path="/projection" element={<Projections/>} />
    </Routes>
  );
}

export default App;

