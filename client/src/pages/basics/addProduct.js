import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./add.css";
import Layout from "./Layout";
import { NavLink, useNavigate } from "react-router-dom";
import cropsData from "../../assets/cropsData.json";
import cities from "../../assets/cityData.json";
//import valida from "./valida";

export default function App() {
  const history = useNavigate();
  const [error,seterror]=([])
  const [label,setLabel]=useState('')
  const [Product, setProducts] = useState({
    Name: "",
    desc: "",
    category: "",
    location: "",
    price: "0",
  });
  console.log(Product);
 
  const [image, setImage] = useState("");
  const fitered = cropsData?.data.filter(
    (data) => data.category == Product.category
  );

  const inputHanddler = (event) => {
    const { name, value } = event.target;
    setProducts({ ...Product, [name]: value });
  };
  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };
  const submitHandler = async (event) => {
   // console.log("heeloo",Product);
   let count=0

    console.log(
      !Product.category,
      !Product.Name,
      Product.Name && JSON.parse(Product?.Name).price
        ? !Number(JSON.parse(Product?.Name).price)
        : !Number(Product.price),
      !Product.desc,
      !image
    );
    //seterror (valida(Product));
    if (!Product.category || !Product.Name || !Product.desc || !image) {
      setLabel("Please fill input fields properly");
      return;
    }
    if (
      Product.Name && JSON.parse(Product?.Name).price
        ? !Number(JSON.parse(Product?.Name).price)
        : !Number(Product.price)
    ) {
      setLabel("Please fill input fields properly");
      return;
    }

    if (Product.category == "Rent" && !Product.location) {
      setLabel("Please fill input fields properly");
      return;
    }

    event.preventDefault();
    console.log(Product);
    var productdata = new FormData();
    productdata.append(
      "Name",
      Product.Name && JSON.parse(Product?.Name).name
        ? `${JSON.parse(Product?.Name).name} / ${Product.location}`
        : ""
    );
    productdata.append("desc", Product.desc);
    productdata.append("Category", Product.category);
    productdata.append(
      "Price",
      Product.Name && JSON.parse(Product?.Name).price
        ? JSON.parse(Product?.Name).price
        : Product.price
    );
    productdata.append("uploadedImage", image);
    await Axios.post("http://localhost:1337/uploadProduct", productdata)
      .then(() => {
        // alert("uploaded");
        history(0);
      })
      .catch((error) => {
       // alert("error");
      });
  };
  useEffect(() => {
    setProducts({ ...Product, Name: "", price: 0 });
    console.log(Product.Name);
  }, [Product.category]);
  return (
    <div className="h-[100vh]">
      <Layout>
        {
          <div
            style={{ textalign: "center", color: "black", marginDown: "20px" }}
          >
            <form onSubmit={submitHandler}>
              <div
                //className="form-group bg-[url('http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRNzzR4wil8lQ_I8LTd4Zk_nnh1lPH04m7e-OIVVzSSALM4VUcCrVqp0tgtVqfCD_NsUPGTNfC24oHlthsCcho')]"
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
                    <select
                      type="text"
                      className="form-control w-80 mx-auto p-1 py-3 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="category"
                      style={{ marginBottom: 15 }}
                      placeholder="Enter category"
                      onChange={inputHanddler}
                    >
                      <option value="">Select Category</option>
                      <option value="Crop">Crop</option>
                      <option value="Seed">Seed</option>
                      <option value="Rent">Rent</option>
                      <option value="Fruit">Fruit</option>
                    </select>
                    <select
                      type="text"
                      className="form-control w-80 h-10 mx-auto p-1 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      name="Name"
                      style={{ marginBottom: 15 }}
                      aria-describedby="emailHelp"
                      placeholder="Enter name (Only Alphabets)"
                      value={Product.Name}
                      onChange={inputHanddler}
                    >
                      <option value="">Select Name</option>
                      {fitered?.map((data, i) => (
                        <option key={i} value={JSON.stringify(data)}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                    {Product.category == "Rent" && (
                      <select
                        className="form-control w-80 h-10 mx-auto p-1 mb-10 bg-white rounded-md"
                        style={{ marginBottom: 15 }}
                        name="location"
                        id="loc"
                        placeholder="Location"
                        value={Product.location}
                        onChange={inputHanddler}
                      >
                        <option placeholder="Type" value="">
                          Location
                        </option>
                        {cities.data.map((data, i) => (
                          <option key={i} value={data.name}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <input
                      type="text"
                      className="form-control w-80 mx-auto p-5 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="desc"
                      style={{ marginBottom: 15 }}
                      placeholder="Enter description"
                      onChange={inputHanddler}
                    ></input>
                    {/* {error.desc && <p style={{ color: 'red' }}>{error.desc}</p>} */}

                    <input
                      type="number"
                      className="form-control w-80 mx-auto p-2 mb-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      style={{ marginBottom: 15 }}
                      name="price"
                      disabled={
                        Product.Name ? JSON.parse(Product?.Name).price : 1
                      }
                      value={
                        Product.Name && JSON.parse(Product?.Name).price
                          ? JSON.parse(Product?.Name).price
                          : Product.price
                      }
                      placeholder="Enter price"
                      onChange={inputHanddler}
                    ></input>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control w-80 mx-auto mb-10 h-10 bg-white rounded-md"
                      id="exampleInputEmail1"
                      style={{ marginBottom: 15 }}
                      aria-describedby="emailHelp"
                      placeholder="Enter file"
                      onChange={imageHandler}
                    ></input>
                    <p style={{color:"white"}}>{label}</p>
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
