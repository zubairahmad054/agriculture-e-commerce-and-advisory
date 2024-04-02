import React, { useState, useEffect } from "react";
import "./style.css";
import Menu from "./cardApi";
import MenuCard from "./MenuCard";
//import React, { useEffect } from 'react'
import { Link, json, useNavigate } from "react-router-dom";
import Axios from "axios";
import Layout from "./Layout";
const Card = () => {
  const [menuData, setMenuData] = useState([]);
  const [filteredMenu, setfilter] = useState([]);
  const navigator = useNavigate();
  const getProducts = async () => {
    await Axios.get(
      "http://localhost:1337/allProducts?token=" + localStorage.getItem("Token")
    )
      .then((result) => {
        console.log(result.data);
        setMenuData(result.data);
        setfilter(result.data);
      })
      .catch((error) => {
        alert("User not authenticated");
        // navigator('/',{replace:true})
      });
  };
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const differentItem = (category) => {
    const updatedList = menuData.filter((currElem) => {
      console.log(currElem.category);
      return currElem.category === category;
    });
    setfilter(updatedList);
  };
  return (
    <Layout>
      <nav className="navbar w-full ">
        <div className=" flex justify-center gap-2 w-full mb-10">
          <button
            className="p-3 bg-white w-40 cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out font-semibold"
            onClick={() => differentItem("Crop")}
          >
            Crop
          </button>
          <button
            className="p-3 bg-white w-40 cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out font-semibold"
            onClick={() => differentItem("Seed")}
          >
            Seed
          </button>
          <button
            className="p-3 bg-white w-40 cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out font-semibold"
            onClick={() => differentItem("Fruit")}
          >
            Fruit
          </button>
          <button
            className="p-3 bg-white w-40 cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out font-semibold"
            onClick={() => differentItem("Rent")}
          >
            Rent Material
          </button>
          <button
            className="p-3 bg-white w-40 cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out font-semibold"
            onClick={() => setfilter(menuData)}
          >
            All
          </button>
        </div>
      </nav>
      <div className="p-10">
        <MenuCard menuData={filteredMenu} />
      </div>
    </Layout>
  );
};

export default Card;
