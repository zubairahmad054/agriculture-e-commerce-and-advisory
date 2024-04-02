import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import blogData from "../../assets/blogData.json";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const [blogss, setBlogss] = useState([]);
  // const [filteredMenu, setfilter] = useState([]);
  // const navigator = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:1337/allBlogs")
      .then((result) => {
        console.log(result.data);
        setBlogss(result.data);
        // setfilter(result.data);
      })
      .catch((error) => {
        alert("User not authenticated");
        // navigator('/',{replace:true})
      });
  }, []);

  console.log(blogData);
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className=" px-5 py-24 mx-auto">
          <div className="flex flex-wrap items-center w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-4xl text-center font-medium title-font mb-2 text-white">
                Blogs
                <div className="h-1 w-full bg-black/20 rounded"></div>
              </h1>
            </div>
            <p className="lg:w-1/2 w-full text-lg leading-relaxed bg-white p-5 rounded-xl shadow-sm text-gray-500">
              A platform empowering farmer to get control of their earnings
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {blogss.map((data, i) => (
              <div key={i} className="xl:w-1/4 md:w-1/2 p-4">
                <NavLink to={`${data.url}`}>
                  <div className="bg-gray-100 shadow-xl p-6 rounded-lg">
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={data.image}
                      alt="content"
                    />
                    {/* <h3 className="tracking-widest truncate text-green-500 text-xs font-medium title-font">
                      {data.slug}
                    </h3> */}
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {data.name}
                    </h2>
                    <p className="leading-relaxed text-base truncate">
                      {data.date}
                    </p>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
