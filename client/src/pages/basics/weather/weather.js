import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import Layout from "../Layout";
import cityData from "../../../assets/cityData.json";
import Background from "../../clouds";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Faisalabad");
  const [geo, setGeo] = useState([]);
  const cities = cityData.data;

  const searchLocation = async () => {
    try {
      const csv = await axios.request({
        method: "GET",
        url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
        params: {
          aggregateHours: "24",
          location: location,
          contentType: "csv",
          unitGroup: "us",
          shortColumnNames: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "b285bc4ecfmsh52bde2ba5e0457bp1b303djsna269717dae7f",
          "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
        },
      });
      // console.log(response.data);
      var headers = [
        "Address",
        "Datetime",
        "Latitude",
        "Longitude",
        "ResolvedAddress",
        "Name",
        "WindDirection",
        "MinimumTemperature",
        "MaximumTemperature",
        "Temperature",
        "WindSpeed",
        "CloudCover",
        "HeatIndex",
        "Chance Precipitation (%)",
        "Precipitation",
        "SeaLevelPressure",
        "SnowDepth",
        "Snow",
        "Relative Humidity",
        "WindGust",
        "WindChill",
        "empty",
        "Conditions",
      ];

      var lines = csv.data.split("\n");
      var result = [];
      const str =
        '"faisalabad","05/13/2023",31.4041,73.0903,"Faisalabad, Pakistan","faisalabad",133.5,85.0,110.9,98.4,8.8,8.3,102.5,0.0,0.0,1001.2,0.0,0.0,10.0,20.4,,,"Clear"';
      const arr = str.split(",");
      console.log(arr.length);
      for (var i = 1; i < lines.length - 1; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);
      }

      console.log(result);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchLocation();
  }, []);

  const getDate = (days) => {
    var date = new Date();
    var res = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const d = new Date(res);
    // alert(d);
    return d;
  };
// Replace 'YOUR_GIPHY_URL' with the actual Giphy URL
const giphyUrl = 'https://giphy.com/embed/RpwupnbQE5nK6iRkYJ';
const giphyIframe = '<iframe src="https://giphy.com/embed/RpwupnbQE5nK6iRkYJ" width="270" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/mgiselly-cu-nuvem-RpwupnbQE5nK6iRkYJ">via GIPHY</a></p>';
// Specify the animation properties
const animationProps = {
  animation: 'fadeIn', // Choose the desired animation (e.g., fadeIn, slideInDown, zoomIn)
  duration: 1000, // Animation duration in milliseconds
  delay: 0, // Delay before the animation starts in milliseconds
  iterationCount: 'infinite', // Number of times the animation should repeat
};

  return (
    <Layout>
      {/* ////////////////////////////////////// */}
      {/* <header className="text-gray-600 z-[999] body-font bg-white sticky top-0 shadow-xl">
        <div className="flex flex-col items-center md:flex-row p-5">
          <NavLink to="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img
                src="images/Logo2.png"
                className="h-10 object-contain"
                alt=""
              />
              <span className="ml-3 text-xl">Asaan Kisaan</span>
            </a>
          </NavLink>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <NavLink to="/">
              <a className="mr-5 hover:text-gray-900">Home</a>
            </NavLink>
            <NavLink to="/weather">
              <a className="mr-5 hover:text-gray-900">Weather</a>
            </NavLink>
            <NavLink to="/Card">
              <a className="mr-5 hover:text-gray-900">Products</a>
            </NavLink>
            <NavLink to="/blog">
              <a className="mr-5 hover:text-gray-900">Blogs</a>
            </NavLink>
            <NavLink to="/addProduct">
              <a className="mr-5 hover:text-gray-900">Add Product</a>
            </NavLink>
            <NavLink to="/admin/allOrders">
              <a className="mr-5 hover:text-gray-900">All Orders</a>
            </NavLink>
          </nav>
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
        </div>
      </header> */}
      
{/* <Background choice={'Cloudy'}/> */}
<div className="weather">
      <div className="py-10 z-2 min-h-[100vh]">
    
        <div className=" grid h-40 justify-center items-start  p-5">
          <select
            value={location}
            className="rounded-xl"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            placeholder="Enter Location"
            type="text"
            style={{ padding: "8px", width: "250px" }}
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
          <div
            className="p-2 rounded-lg text-center font-semibold w-40 mx-auto cursor-pointer  mt-2 bg-white text-black"
            onClick={() => {
              console.log(location);
              searchLocation();
            }}
          >
            Search
          </div>
        </div>
        
        <div style={{ marginTop: "50px" }} className="det   text-white">
          <div className="">
            <div className="location">
              {data[0]?.Address ? (
                <p className="text-4xl">
                  {data[0]?.Address?.toUpperCase().slice(
                    1,
                    data[0]?.Address.length - 1
                  )}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-10 items-center">
              <div className="temp">
                {data[0]?.Address ? (
                  // <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
                  <h1>
                    {Math.floor((data[0].Temperature - 32) * (5 / 9))}°C
                  </h1>
                ) : null}
              </div>
              <div className="description">
                {data[0]?.Address ? (
                  <p>
                    {data[0]?.Conditions?.toUpperCase().slice(
                      1,
                      data[0]?.Conditions.length - 1
                    )}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {data[0]?.Address && (
            <div className="bottom">
              <div className="feels">
                <p className="bold">
                  {Math.floor((data[0].Temperature - 32) * (5 / 9))}°C
                </p>

                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">{data[0]?.HeatIndex}%</p>

                <p>Heat Index</p>
              </div>
              <div className="wind">
                <p className="bold">{data[0]?.WindSpeed} MPH</p>

                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex gap-5 overflow-x-auto"> */}
        {data[0]?.Address &&
          data.map((data, i) => (
            <div
              key={i}
              style={{ marginTop: "50px" }}
              className="det   text-white"
            >
              <div className="feels mx-auto text-center text-black bg-white/60 w-full p-3 rounded-tr-lg rounded-tl-lg">
                <p className="text-sm">
                  {/* {today.getDate() + (i + 1)}, {month[today.getMonth()]} */}
                  {getDate(i + 1).toDateString()}
                </p>
                <p className="text-lg">
                  {data?.Conditions?.toUpperCase().slice(
                    1,
                    data?.Conditions.length - 1
                  )}
                </p>
              </div>
              <div className="bottom">
                <div className="feels">
                  <p className="bold">
                    {Math.floor((data.MaximumTemperature - 32) * (5 / 9))}°C
                  </p>

                  <p>MAX TEMP</p>
                </div>
                <div className="humidity">
                  <p className="bold">
                    {Math.floor((data.MinimumTemperature - 32) * (5 / 9))}°C
                  </p>

                  <p>MIN TEMP</p>
                </div>
                <div className="wind">
                  <p className="bold">{data.WindSpeed} MPH</p>

                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      </div>
    
    </Layout>
  );
}

export default Weather;
