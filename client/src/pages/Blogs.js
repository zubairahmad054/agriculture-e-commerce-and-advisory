import React, { useState } from "react";
import { useParams, withRouter } from "react-router";
import blogData from "../assets/blogData.json";
import Layout from "./basics/Layout";

const Blogs = () => {
  const { slug } = useParams();
  //   const [blog, setBlog] = useState({});
  const blog = blogData.data.filter((data) => data.slug == slug);
  console.log(blog);
  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className=" px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2  w-full lg:h-auto h-64 object-cover rounded-xl object-center overflow-hidden"
              src={blog[0].imgUrl}
            />
            <div className="lg:w-1/2 bg-white shadow-xl rounded-2xl w-full p-10 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {blog[0].name}
              </h1>

              <p className="leading-relaxed mt-5">{blog[0].p1}</p>
              <p className="leading-relaxed mt-5">{blog[0].p2}</p>
              <p className="leading-relaxed mt-5">{blog[0].p3}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
