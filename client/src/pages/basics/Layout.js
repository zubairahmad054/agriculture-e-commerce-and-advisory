import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [user, setUser] = useState();
  const history = useNavigate();

  useEffect(() => {
    let getuserarr = localStorage.getItem("data");
    // console.log(getuserarr);
    setUser(JSON.parse(getuserarr));
  }, []);

  return (
    <div>
      {/* ////////////////////////////////// */}
      <header className="text-white z-[999] body-font bg-green-600 sticky top-0 shadow-xl">
        <div className="flex flex-col items-center md:flex-row p-5">
          <NavLink to="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img
                src="/images/Logo2.png"
                className="h-12 p-2 bg-white rounded-full object-contain"
                alt=""
              />
              <span className="ml-3 text-white text-xl">Asaan Kisaan</span>
            </a>
          </NavLink>
         
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <NavLink to="/">
              <a className="mr-5 hover:text-gray-900">Home</a>
            </NavLink>
            <NavLink to="/weather">
              <a className="mr-5 hover:text-gray-900">Weather</a>
            </NavLink>
            <NavLink to="/projection">
              <a className="mr-5 hover:text-gray-900">Projection</a>
            </NavLink>
            <NavLink to="/Card">
              <a className="mr-5 hover:text-gray-900">Products</a>
            </NavLink>
            <NavLink to="/blog">
              <a className="mr-5 hover:text-gray-900">Blogs</a>
            </NavLink>
            {user?.type == "FARMER" || user?.type == "ADMIN" ? (
              <NavLink to="/addProduct">
                <a className="mr-5 hover:text-gray-900">Add Product</a>
              </NavLink>
            ) : (
              ""
            )}

            {user?.type == "ADMIN" && (
              <NavLink to="/admin/allOrders">
                <a className="mr-5 hover:text-gray-900">All Orders</a>
              </NavLink>
            )}
            {user?.type == "ADMIN" && (
              <NavLink to="/addBlog">
                <a className="mr-5 hover:text-gray-900">Add Blog</a>
              </NavLink>
            )}
          </nav>
          {!user?._id && (
            <NavLink to="/login">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Sign In
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </NavLink>
          )}
          {user?._id && (
            <>
              <button
                onClick={() => {
                  history("/profile");
                }}
                className="inline-flex mr-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("data", null);
                  history("/login");
                }}
                className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Logout
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ////////////////////////////////////////////////////////// */}
      {children}
      {/* //////////////////////////////////////////////////////////// */}
      <footer className=" pb-10 bg-black text-white body-font px-10">
        <div className=" px-5 py-24 mx-auto">
          <div className="flex flex-wrap md:text-left justify-center text-center -mb-10 -mx-4">
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                Links
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    href="/login"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Sign In
                  </a>
                </li>

                <li>
                  <a href="/Card" className="text-gray-600 hover:text-gray-800">
                    Products
                  </a>
                </li>

                <li>
                  <a href="/blog" className="text-gray-600 hover:text-gray-800">
                    Blog
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                Member Names
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Hammad Tariq
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Muhammad Ahmad
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Zubair Ahmad
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                Roll No
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">19F-0124</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">19F-0265</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">19F-0110</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t px-10 border-gray-200">
          <div className=" px-5 py-8 flex flex-wrap justify-center mx-auto items-center">
            <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-center md:w-full">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
      {/* /////////////////////////////////////////////////////// */}
    </div>
  );
};

export default Layout;
