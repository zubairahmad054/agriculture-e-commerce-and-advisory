import React, { useEffect, useState } from "react";
import validation from "./validation";
import validationinfo from "./validationinfo";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import dataArray from "../assets/projection";
const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [store, setStore] = useState([]);
  // const [data,setdata]=useState([]);
  const [error, seterror] = useState({ validation });


  const submit = async (e) => {
    e.preventDefault();
    const LoginEntry = { email: email, password: password };
    // console.log(LoginEntry);
    setStore([...store, LoginEntry]);
    //   localStorage.setItem("store",store);
    // seterror(validation(LoginEntry));
    // console.log(store);
    if (email && email.includes("@") && password) {
      
      await Axios.post("http://localhost:1337/api/login", LoginEntry)
        .then((result) => {
          console.log(result.data.user);
          if (
            result.data.user !== "not found" &&
            result.data.user !== "Wrong Credentials"
          ) {
            localStorage.setItem("data", JSON.stringify(result.data.User));
            history("/Card");
            if (result.data.User.type === "FARMER") {
              history("/addProduct");
            } else {
              history("/Card");
            }
            // alert("Logged in");
            return;
          }
          //alert("Invalid password");
        })
        .catch((error) => {
          console.log(error);
          //alert("Invalid password");
        });
    } else {
    }
    //    console.log(data);
  };

  ///////////////////////////////////////////
  // function validation(values) {
  //   let getuserarr = localStorage.getItem("data");
  //   // console.log(getuserarr);
  //   let error = {};
  //   if (!values.email) {
  //     error.email = "Email Required";
  //   } else if (!values.email.includes("@")) {
  //     error.email = "Email Invalid";
  //   } else if (!values.password) {
  //     error.password = "Password Required";
  //   } else {
  //     if (getuserarr && getuserarr.length) {
  //       const userdata = JSON.parse(getuserarr);
  //       // console.log(userdata);
  //       const userlogin = userdata?.filter((el, k) => {
  //         return el.email === values.email && el.password === values.password;
  //       });
  //       console.log(userlogin);
  //       if (userlogin.length === 0) {
  //         error.check = "Invalid Detail";
  //       } else {
  //         console.log("login successfully");
  //         localStorage.setItem("User_login", JSON.stringify(getuserarr));
  //         history("/formsucces");
  //       }
  //     }
  //   }
  //   return error;
  // }

  return (
    <div className=" m-auto">
      <div
        className="main justify-between min-h-[88vh]"
        style={{
          marginTop: "45px",
          display: "flex",
          marginLeft: "50px",
          marginRight: "50px",
          height: "auto",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <img
          style={{ width: "200px", height: "200px", marginLeft: "15px" }}
          src="images/Logo2.png"
        />
        <div
          className="main1"
          style={{ padding: "150px 100px 50px 50px", marginLeft: "-60px" }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Sign In / سائن اپ کریں</h2>
            <p className="text-base font-semibold"></p>
          </div>
          <br />
          <label htmlFor="email">Email /  ای میل</label>
          <br />
          <input
            className="border bg-gray-200 p-5 text-black placeholder:text-black rounded-md"
            type="text"
            name="email"
            id="email"
            placeholder="Email / ای میل"
            value={email}
            size="40"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderTopStyle: "none",
              borderLeftStyle: "none",
              borderRightStyle: "none",
            }}
          ></input>
          <br />
          <br />
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}
          <label>Password / پاس ورڈ</label>
          <br />
          <input
            className="border bg-gray-200 p-5 text-black placeholder:text-black rounded-md"
            type="password"
            name="password"
            id="password"
            placeholder="password /  پاس ورڈ"
            value={password}
            size="40"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderTopStyle: "none",
              borderLeftStyle: "none",
              borderRightStyle: "none",
            }}
          ></input>
          <br />
          <br />
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          <div className="w-full grid justify-center">
            <button
              className="bg-green-800 text-white"
              name="check"
              id="check"
              onClick={submit}
            >
              Sign in / سائن ان کریں
            </button>
          </div>
          <br />
          <br />
          <span className="form-input-login">
            Don't have an account? کیا آپ کا کوئی اکاؤنٹ نہیں ہے؟{" "}
            <NavLink
              className="font-semibold"
              to="/signin"
              style={{ color: "rgb(74, 74, 171)", textDecoration: "none" }}
            >
              Sign up /  سائن اپ کریں
            </NavLink>
          </span>
          <span> {error.check && <p>{error.check}</p>}</span>
        </div>

        <div style={{ marginLeft: "50px" }}>
          <img
            src="images/wheat.jpg"
            className="object-cover"
            style={{
              height: "100%",
              maxWidth: "100%",
              backgroundSize: "100%",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

