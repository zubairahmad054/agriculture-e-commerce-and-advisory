import React, { useEffect, useState } from "react";
import "../index.css";
import Layout from "./basics/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cities from "../assets/cityData.json";

const Landing = () => {
  const [menuData, setMenuData] = useState([]);

  const getProducts = async () => {
    await Axios.get(
      "http://localhost:1337/allProducts?token=" + localStorage.getItem("Token")
    )
      .then((result) => {
        // console.log(result.data);
        setMenuData(result.data);
      })
      .catch((error) => {
        //alert("User not authenticated");
        // navigator('/',{replace:true})
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="w-full ">
        {/* /////////////////////////////////////////// */}
        {/* //////////////////////////////////////// */}
        <section className="text-gray-600 body-font">
          <div className="flex flex-col items-center md:flex-row bg-white p-10 rounded-2xl m-10">
            <div className="lg:flex-grow  md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Asaan Kisaan
              </h1>
              <p className="mb-8 leading-relaxed" style={{ textAlign: "justify" }}>
                Asaan Kisaan provide farmers with an opportunity to sell their products
                across the country maximizing their reach from local markets to national
                markets and will also give them autonomy while deciding the price for their
                crops. / کسانوں کو ایک موقع فراہم کرتا ہے کہ وہ اپنے پیداوار کو پورے ملک میں بیچ سکیں جس سے ان کی رسائی مقامی مارکیٹوں سے لے کر قومی مارکیٹوں تک بڑھ جائے گی۔ یہ ان کو ان کی فصلوں کی قیمت تعین کرتے وقت خود مختاری بھی فراہم کرے گا۔ 
              </p>

              <div className="flex justify-center">
                <NavLink to={`/blog`}>
                  <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Read More
                  </button>
                </NavLink>
                {/* <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Button
                </button> */}
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/India_Farming.jpg"
              />
            </div>
          </div>
        </section>
        {/* ///////////////////////////////////////// */}
        <section className="text-gray-600 body-font p-10 pt-2">
          <div className=" px-5 pb-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
              Insights
            </h1>
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="text-green-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 17l4 4 4-4m-4-5v9"></path>
                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    2.7K
                  </h2>
                  <p className="leading-relaxed">Visitors</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="text-green-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    1.3K
                  </h2>
                  <p className="leading-relaxed">Customers</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="text-green-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    {menuData.length}
                  </h2>
                  <p className="leading-relaxed">Products</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="text-green-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    {Cities.data.length}
                  </h2>
                  <p className="leading-relaxed">Cities</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /////////////////////////////////////////////////////// */}

        {/* ////////////////////////// */}
      </div>
    </Layout>
  );
};

export default Landing;
