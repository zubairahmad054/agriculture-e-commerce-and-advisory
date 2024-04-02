import React, { useEffect } from "react";
import validationinfo from "./validationinfo";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import cityData from "../assets/cityData.json";

export default function Login() {
  ////////////////////////////////////////////////////
  const [Uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [loc, setlocation] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [store, setStore] = useState([]);
  const [data, setdata] = useState([]);
  const [error, seterror] = useState({});
  const [flag, setflag] = useState(true);
  const [type, settype] = useState("");
  const check1 = {};
  const navigate = useNavigate();

  //////////////////////////
  ///////////////////////////
  const cities = cityData.data;
  //////////////////////////////////
  ////////////////////////////////////////////////////
  const submitform = (e) => {
    e.preventDefault();
    const newEntry = {
      Uname: Uname,
      email: email,
      password: password,
      Cpassword: Cpassword,
      loc: loc,
      type: type,
    };
    // console.log(newEntry);
    setStore([...store, newEntry]);
    seterror(validationinfo(newEntry));
    // console.log(newEntry);
    // console.log(newEntry.Uname.length);
    if (
      newEntry.loc.length === 0 ||
      !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(newEntry.Uname) ||
      newEntry.email.length === 0 ||
      newEntry.password.length === 0 ||
      newEntry.Cpassword.length === 0 ||
      newEntry.password.length < 6 ||
      newEntry.Cpassword.length < 6 ||
      newEntry.password !== newEntry.Cpassword ||
      newEntry.type.length === 0
    ) {
      setflag(false);
      error.check1 = "invalid fields";
      alert("invalid fields");
    } else {
      setflag(true);
      setdata([...data, newEntry]);
      console.log(newEntry)
      Axios.post("http://localhost:1337/api/register", { newEntry }).then(
        (result) => {
          console.log("result => ", result);
          // alert("Account Created ");
          navigate("/login");
        }
      );

      // console.log(store);
      // console.log(data);
    }
  };

  /////////////////////////////////// Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  ////////////////////////////////////////////////////
  //  useEffect(() => {
  //   // Update the document title using the browser API
  //   if(flag===true)
  //   {
  //   localStorage.setItem("UserData",JSON.stringify(data));
  //   console.log(store);
  //   }
  // },[data]);
  ////////////////////////////////////////////////////

  const typeHandler = (event) => {
    settype(event.target.value);
    console.log(event.target.value);
  };
  ///////////////////////////////////////////////////RENDER
  return (
    <>
      <div className=" m-auto">
        <div
          style={{ textalign: "center", color: "black", marginDown: "20px" }}
        ></div>
        <div
          className="main justify-between"
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
          {/* <h1 style={{'whiteSpace':"nowrap",'marginLeft':"20px",color:"lightblue"}}>Expert hub</h1><br/> */}
          <div
            className="main1"
            style={{ padding: "150px 100px 50px 50px", marginLeft: "-60px" }}
          >
            <div className="text-center">
              <h2
                className="text-2xl font-semibold"
                style={{ textAlign: "center" }}
              >
                Welcome/خوش آمدید
              </h2>
              <p className="text-base font-semibold">
                Please Enter Your Detail to register/براہ کرم اپنی تفصیلات درج کریں تا رجسٹر ہوں
              </p>
            </div>
            <div>
              <label className="mt-1 font-semibold" htmlFor="Uname">
                Name / نام
              </label>
              <br />
              <input
                className="border bg-gray-200 p-5 text-black placeholder:text-black rounded-md"
                type="text"
                name="Uname"
                id="Uname"
                placeholder="name / نام"
                value={Uname}
                size="40"
                onChange={(e) => setUname(e.target.value)}
              ></input>
              <br />
              {error.Uname && (
                <p style={{ color: "red", fontSize: "10px" }}>{error.Uname}</p>
              )}
              <label className="mt-1 font-semibold" htmlFor="email">
                Email / ای میل
              </label>
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
              ></input>
              <br />
              {error.email && (
                <p style={{ color: "red", fontSize: "10px" }}>{error.email}</p>
              )}
              <label className="mt-1 font-semibold" htmlFor="loc">
                Location /  مقام
              </label>
              <br />
              {/* <select
                // className="border bg-gray-200 p-5 text-black placeholder:text-black rounded-md"

                name="loc"
                id="loc"
                placeholder="Location"
                value={loc}
                size="40"
                onChange={(e) => setlocation(e.target.value)}
              > */}
              <select
                className="border-2 bg-white text-black p-2 mt-2 rounded-md"
                style={{ width: "88%" }}
                name="loc"
                id="loc"
                placeholder="Location / مقام"
                value={loc}
                onChange={(e) => setlocation(e.target.value)}
              >
                <option placeholder="Type" value="">
                  Location
                </option>
                {cities.map((data, i) => (
                  <option key={i} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
              <br />
              {error.loc && (
                <p style={{ color: "red", fontSize: "10px" }}>{error.loc}</p>
              )}
              <label className="mt-1 font-semibold">Password / پاس ورڈ</label>
              <br />
              <input
                className="border bg-gray-200 p-5 text-black placeholder:text-black rounded-md"
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password / پاس ورڈ"
                value={password}
                size="40"
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <br />
              {error.password && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {error.password}
                </p>
              )}
              <label className="mt-1 font-semibold">Confirm Password / تصدیق کریں</label>
              <br />
              <input
                className="border bg-gray-200 p-5 text-black placeholder:text-black rounded-md"
                type="password"
                name="Cpassword"
                id="Cpassword"
                placeholder="Confirm password / کریں تصدیق"
                value={Cpassword}
                size="40"
                onChange={(e) => setCPassword(e.target.value)}
              ></input>
              <br />
              {error.Cpassword && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {error.Cpassword}
                </p>
              )}
              <label className="mt-1 font-semibold">Type / قسم</label>
              <select
                className="border-2 bg-white text-black p-2 mt-2 rounded-md"
                style={{ width: "88%" }}
                name="user"
                id="user"
                onClick={typeHandler}
              >
                <option placeholder="Type" value="">
                  Type
                </option>
                <option value="FARMER">FARMER / کاشتکار</option>
                <option value="BUYER">BUYER / خریدار</option>
              </select>
              <br />
              <br />
              {type === "" && flag === false && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  Please enter type
                </p>
              )}
              <div className="grid w-full justify-center">
                <button
                  className="bg-green-800 text-white"
                  name="check"
                  id="check"
                  onClick={submitform}
                >
                  Register/رجسٹر کریں
                </button>
              </div>
              <br />
              <br />
              <span className="form-input-login">
                Already have an account?/ پہلے سے حساب ہے؟{" "}
                <NavLink
                  className="font-semibold"
                  to="/login"
                  style={{ color: "rgb(74, 74, 171)", textDecoration: "none" }}
                >
                  Login / لاگ ان کریں
                </NavLink>
              </span>
              {/* <span> {error.check && <p>{error.check}</p>}</span> */}
            </div>
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
    </>
  );
}

