import React, { useState } from "react";
import Axios from "axios";
import "./add.css";
import Layout from "./Layout";
import { NavLink, useNavigate } from "react-router-dom";
export default function Blog() {
  const history = useNavigate();
  const [Product, setProducts] = useState({
    name: "",
    image: "",
    url: "",
    date: "",
  });
  const [image, setImage] = useState("");

  const inputHanddler = (event) => {
    const { name, value } = event.target;
    setProducts({ ...Product, [name]: value });
  };
  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };
  const submitHandler = async (event) => {
    // console.log(
    //   Product.name == "",
    //   Product.url == "",
    //   Product.image == "",
    //   Product.date == ""
    // );
    if (
      Product.name == "" ||
      Product.image == "" ||
      Product.date == "" ||
      Product.url == "" ||
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(
        Product.url
      ) == false
    ) {
      alert("Please fill input fields properly");
      return;
    }
    // console.log(/^[a-zA-Z]+$/.test(Product.Name), Product.Name);

    event.preventDefault();
    console.log(Product);

    await Axios.post("http://localhost:1337/createBlog", Product)
      .then(() => {
        // alert("uploaded");
        history(0);
      })
      .catch((error) => {
        alert("error");
      });
    // console.log(productdata.get("Price"));
  };
  console.log(Product);
  return (
    <div className="h-[100vh]">
      <Layout>
        {
          <div
            style={{ textalign: "center", color: "black", marginDown: "20px" }}
          >
            <form onSubmit={submitHandler}>
              <div
                className="form-group bg-[url('http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRNzzR4wil8lQ_I8LTd4Zk_nnh1lPH04m7e-OIVVzSSALM4VUcCrVqp0tgtVqfCD_NsUPGTNfC24oHlthsCcho')]"
                style={{
                  display: "flex justify-center",
                  flex: 1,
                  justifyContent: "center",
                  height: "100vh",
                  alignItems: "center",
                  backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                  backgroundSize: "cover",
                }}
              >
                <div className="grid justify-center items-center h-[90vh]">
                  <div className="grid justify-center">
                    <input
                      type="text"
                      className="form-control w-80 mx-auto p-5 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      name="name"
                      style={{ marginBottom: 15 }}
                      aria-describedby="emailHelp"
                      placeholder="Enter name"
                      onChange={inputHanddler}
                    ></input>
                    <input
                      type="text"
                      className="form-control w-80 mx-auto p-5 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="image"
                      style={{ marginBottom: 15 }}
                      placeholder="Enter Image URL"
                      onChange={inputHanddler}
                    ></input>
                    <input
                      type="text"
                      className="form-control w-80 mx-auto p-5 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="url"
                      style={{ marginBottom: 15 }}
                      placeholder="Enter Blog URL"
                      onChange={inputHanddler}
                    ></input>
                    <input
                      type="date"
                      className="form-control w-80 mx-auto p-2 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      style={{ marginBottom: 15 }}
                      name="date"
                      placeholder="Select Date"
                      onChange={inputHanddler}
                    ></input>

                    <div
                      type="submit"
                      onClick={(e) => {
                        submitHandler(e);
                      }}
                      className="bg-green-600 cursor-pointer p-2 rounded-md w-20 text-center mx-auto text-white hover:text-black"
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        }
      </Layout>
    </div>
  );
}
