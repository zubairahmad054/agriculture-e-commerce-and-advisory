import React, { useEffect, useState } from "react";
import "../index.css";
import Layout from "./basics/Layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cities from "../assets/cityData.json";
import { loadStripe } from "@stripe/stripe-js";

const Success = () => {
  const [menuData, setMenuData] = useState([]);
  const [retrieve, setRetrieve] = useState({});
  const [id, setId] = useState({ id: "", quantity: 1, range: {} });

  const location = useLocation();
  const getParams = () => {
    const params = new URLSearchParams(location.search);
    const item = params.get("item");
    const itemQuantity = params.get("item_quantity");
    const range = params.get("range");

    setId({
      id: item,
      quantity: itemQuantity,
      range: JSON.parse(range),
    });
  };
  const product = menuData?.filter((data) => data._id == id.id);

  const order = {
    name: retrieve?.customer_details?.name,
    email: retrieve?.customer_details?.email,
    address: `${retrieve?.customer_details?.address?.line1} ${retrieve?.customer_details?.address?.line2}, ${retrieve?.customer_details?.address?.city}, ${retrieve?.customer_details?.address?.country}`,
    product: { ...product[0], range: id?.range },
    quantity: id.quantity,
    price: retrieve?.amount_total / 100,
  };

  useEffect(() => {
    Axios.post("http://localhost:1337/getOrder", {
      id: localStorage.getItem("sessionId"),
    }).then((response) => {
      setRetrieve(response.data.order);
      Axios.get("http://localhost:1337/allProducts")
        .then((result) => {
          getParams();
          setMenuData(result.data);
        })
        .catch((error) => {
          alert("User not authenticated");
        });
    });
  }, []);

  useEffect(() => {
    if (order?.product?._id && localStorage.getItem("sessionId")) {
      Axios.post("http://localhost:1337/postOrders", order)
        .then(() => {
          // alert("Order Placed Successfully");
          localStorage.removeItem("sessionId");
          // history(0);
        })
        .catch((error) => {
          alert("error");
        });
    }
  }, [order]);

  console.log(product, retrieve, order);

  return (
    <Layout>
      <div className="w-full">
        {/* /////////////////////////////////////////// */}
        {/* //////////////////////////////////////// */}
        <section className="text-gray-600 body-font">
          <div className="flex flex-col items-center md:flex-row bg-white p-10 rounded-2xl m-10">
            <div className="lg:flex-grow  md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Order Placed Successfully
              </h1>

              <div className="flex justify-center">
                <NavLink to={`/Card`}>
                  <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Back to Product Page 
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

        {/* /////////////////////////////////////////////////////// */}

        {/* ////////////////////////// */}
      </div>
    </Layout>
  );
};

export default Success;
