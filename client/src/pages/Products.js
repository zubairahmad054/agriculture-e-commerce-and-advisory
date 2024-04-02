import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import Layout from "./basics/Layout";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { loadStripe } from "@stripe/stripe-js";

const Products = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [checkout, setCheckout] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [orders, setOrders] = useState([]);

  // const [blog, setBlog] = useState({});
  const product = menuData.filter((data) => data._id == id);
  // console.log(product);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    state: "",
    city: "",
    card: 0,
    expiry: "",
    cvc: 0,
    product: product[0],
    quantity: 1,
  });
  //////////////DATE PICKER
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
    console.log(selectedRange);
  };

  // SUBMIT FUMCTION

  const placeOrder = async () => {
    if (
      order.name &&
      order.email &&
      order.address &&
      order.state &&
      order.city &&
      parseInt(order.card) > 999999999999999 &&
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(order.expiry) == true &&
      parseInt(order.cvc) > 99 &&
      product[0].price
    ) {
      if (product[0]?.category == "Rent") {
        if (!selectedRange.startDate || !selectedRange.endDate) {
          // alert("Fill Details Properly");
          return;
        }
      }

      setFiltered(product);
      const payload = {
        ...order,
        address: `${order.address}, ${order.state}, ${order.city}`,
        price: filtered[0].price * order.quantity,
        product: { ...filtered[0], range: selectedRange },
      };
      console.log(payload);
      await Axios.post("http://localhost:1337/postOrders", payload)
        .then(() => {
          // alert("Order Placed Successfully");
          history(0);
        })
        .catch((error) => {
          alert("error");
        });
    } else {
      // alert("Fill Details Properly");
      console.log(
        order,
        parseInt(order.card) > 999999999999999,
        parseInt(order.cvc) > 99
      );
    }
  };

  const placeStrpeOrder = async () => {
    const stripe = await loadStripe(
      "pk_test_51K5j6lH0TRxmYn7ihGEssMzPBPvsLeVlyHCkyuz1i5OSaHpeoB3bilIoqJpFIs3ECW5khAnYGOehXpQxf4jMgFFL00aX9v8SzZ"
    );
    const response = await Axios.post("http://localhost:1337/stripeOrder", {
      ...product[0],
      quantity: order.quantity,
      range: JSON.stringify(selectedRange),
    });
    const sessionId = response?.data?.sessionId;
    localStorage.setItem("sessionId", sessionId);
    // Redirect to Stripe checkout page
    console.log(sessionId);

    stripe.redirectToCheckout({ sessionId: sessionId });
  };

  // GEWT PRODUCTS
  //////////ORDER FETCHER

  const getProducts = async () => {
    await Axios.get(
      "http://localhost:1337/allProducts?token=" + localStorage.getItem("Token")
    )
      .then((result) => {
        // console.log(result.data);
        setMenuData(result.data);
        /////Fetch orders
        Axios.get("http://localhost:1337/allOrders")
          .then((result) => {
            setOrders(result.data);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert("User not authenticated");
        // navigator('/',{replace:true})
      });
  };

  const orderss = orders.filter(
    (data) => data?.product?._id == product[0]?._id
  );
  // console.log(orderss[orderss.length - 1]);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setOrder({ ...order, product: product[0] });
  }, []);

  const rented = async (id, state) => {
    await Axios.post("http://localhost:1337/updateProduct", {
      id: id,
      state: state,
    })
      .then(() => {
        // alert("Status Updated");
        history(0);
      })
      .catch((error) => {
        alert(error);
      });
  };
  let getuserarr = localStorage.getItem("data");
  // console.log(getuserarr);

  return (
    <Layout>
      {/* {checkout == 1 && (
        <section className="text-gray-600 body-font relative bg-[url('http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRNzzR4wil8lQ_I8LTd4Zk_nnh1lPH04m7e-OIVVzSSALM4VUcCrVqp0tgtVqfCD_NsUPGTNfC24oHlthsCcho')]">
          <div className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-1/3 md:w-1/2 bg-white shadow-2xl rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 ">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Checkout
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                Enter your address details
              </p>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setOrder({ ...order, name: e.target.value });
                  }}
                  className="w-full  bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 p-5 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setOrder({ ...order, email: e.target.value });
                  }}
                  className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  State/Province
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setOrder({ ...order, state: e.target.value });
                  }}
                  className="w-full  bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 p-5 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setOrder({ ...order, city: e.target.value });
                  }}
                  className="w-full  bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 p-5 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setOrder({ ...order, address: e.target.value });
                  }}
                  className="w-full  bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 p-5 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div
                onClick={() => {
                  setCheckout(2);
                }}
                className="text-white cursor-pointer text-center bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Next
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Orders can be replaced within 3 days
              </p>
            </div>
          </div>
        </section>
      )}
      {checkout == 2 && (
        <section className="text-gray-600 body-font relative bg-[url('http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRNzzR4wil8lQ_I8LTd4Zk_nnh1lPH04m7e-OIVVzSSALM4VUcCrVqp0tgtVqfCD_NsUPGTNfC24oHlthsCcho')]">
          <div className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-2/4 md:w-1/2 bg-white shadow-2xl rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 ">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Checkout
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                Enter your card details
              </p>

              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Card
                </label>
                <input
                  type="number"
                  id="email"
                  min={999999999999999}
                  max={9999999999999999}
                  name="email"
                  onChange={(e) => {
                    setOrder({ ...order, card: parseInt(e.target.value) });
                  }}
                  className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className=" flex gap-5 relative mb-4">
                <div>
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Expiry
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => {
                      setOrder({ ...order, expiry: e.target.value });
                    }}
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 p-5 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    CVC
                  </label>
                  <input
                    type="number"
                    id="email"
                    min={99}
                    max={999}
                    name="email"
                    onChange={(e) => {
                      setOrder({ ...order, cvc: parseInt(e.target.value) });
                    }}
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              {product[0]?.category == "Rent" && (
                <div className="w-full overflow-x-auto">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Select Renting Date
                  </label>
                  <DateRangePicker
                    ranges={[selectedRange]}
                    onChange={handleSelect}
                  />
                </div>
              )}
              <div
                onClick={() => {
                  setCheckout(1);
                }}
                className="text-white mb-2 cursor-pointer text-center bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Back
              </div>
              <button
                onClick={() => {
                  placeOrder();
                }}
                className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Place Order
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Orders can be replaced within 3 days
              </p>
            </div>
          </div>
        </section>
      )} */}
      {checkout == 0 && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className=" px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full rounded-lg lg:h-auto h-64 object-cover object-center"
                src={product[0]?.image}
              />
              <div className="lg:w-1/2 bg-white rounded-xl px-10  w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product[0]?.category}
                </h2>
                <h1 className="text-gray-900 text-4xl title-font font-semibold mb-1">
                  {product[0]?.name}
                </h1>

                <p className="leading-relaxed text-lg">
                  {product[0]?.description}
                </p>

                {product[0]?.category !== "Rent" && (
                  <div className="flex items-center  gap-5">
                    <div
                      onClick={() => {
                        if (order.quantity > 1) {
                          setOrder({ ...order, quantity: order.quantity - 1 });
                        }
                      }}
                      className="p-3 bg-green-800 text-white rounded-lg cursor-pointer"
                    >
                      -
                    </div>
                    <p>{order.quantity}</p>
                    <div
                      onClick={() => {
                        setOrder({ ...order, quantity: order.quantity + 1 });
                      }}
                      className="p-3 bg-green-800 text-white rounded-lg cursor-pointer"
                    >
                      +
                    </div>
                    <p>Total Price Per Kg: {product[0]?.price * order.quantity}</p>
                  </div>
                )}

                <div className="flex mt-5">
                  <span className="title-font font-semibold text-2xl text-gray-900">
                    {product[0]?.price}&nbsp;
                    {product[0]?.category == "Rent" ? "PKR / Per Hour" : "PKR"}
                  </span>

                  {product[0]?.category !== "Rent" &&
                    JSON.parse(getuserarr)?.type !== "ADMIN" && (
                      <button
                        onClick={() => {
                          // setCheckout(1);
                          placeStrpeOrder();
                        }}
                        className="flex ml-auto font-semibold text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                      >
                        Buy now
                      </button>
                    )}

                  {product[0]?.category == "Rent" &&
                    JSON.parse(getuserarr)?.type !== "ADMIN" && (
                      <>
                        {!product[0]?.rented ? (
                          <button
                            onClick={() => {
                              placeStrpeOrder();
                            }}
                            className="flex ml-auto font-semibold text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                          >
                            Rent
                          </button>
                        ) : (
                          <button
                            disabled
                            className="flex ml-auto font-semibold text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                          >
                            Already Occupied
                          </button>
                        )}
                      </>
                    )}
                </div>
                <br />
                {product[0]?.category == "Rent" && !product[0]?.rented && (
                  <div className="w-full overflow-x-auto">
                    <label
                      for="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Select Renting Date
                    </label>
                    <DateRangePicker
                      ranges={[selectedRange]}
                      onChange={handleSelect}
                    />
                  </div>
                )}
                <br />

                <div>
                  {product[0]?.rented && product[0]?.category == "Rent" && (
                    <p>
                      Rented From:{" "}
                      {orderss[
                        orderss.length - 1
                      ]?.product?.range?.startDate?.slice(0, 10)}{" "}
                      to{" "}
                      {orderss[
                        orderss.length - 1
                      ]?.product?.range?.endDate?.slice(0, 10)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5 ">
              {JSON.parse(getuserarr)?.type == "ADMIN" && (
                <>
                  {product[0]?.rented && product[0]?.category == "Rent" && (
                    <div
                      onClick={() => {
                        rented(product[0]?._id, 0);
                      }}
                      className="text-xs cursor-pointer font-semibold p-4 shadow-2xl border-2 border-black mr-4 bg-red-600 text-white rounded-lg "
                    >
                      Occupied
                    </div>
                  )}
                  {!product[0]?.rented && product[0]?.category == "Rent" && (
                    <div
                      onClick={() => {
                        rented(product[0]?._id, 1);
                      }}
                      className="text-xs cursor-pointer font-semibold p-4 shadow-2xl border-2 border-black mr-4 bg-green-600 text-white rounded-lg "
                    >
                      Not Occupied
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Products;
