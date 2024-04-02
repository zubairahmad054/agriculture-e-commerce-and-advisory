import React, { useEffect } from "react";

const style = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    maxWidth: 300,
    margin: "auto",
    textAlign: "center",
  },
  title: {
    color: "grey",
    fontSize: 18,
  },
  button: {
    border: "none",
    outline: 0,
    display: "inlineBlock",
    padding: 8,
    color: "white",
    backgroundColor: "#000",
    textAlign: "center",
    cursor: "pointer",
    width: "100%",
    fontSize: 18,
  },
  a: {
    textDecoration: "none",
    fontSize: 22,
    color: "black",
  },
};
function card(personName, title, email) {
  const Data =
    localStorage.getItem("data") && JSON.parse(localStorage.getItem("data"));
  return (
    <div style={style.card}>
      <img
        src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"
        width="200"
      />
      <h4>{Data?.Uname}</h4>
      <p className={style.title}>{Data?.type}</p>
      <p>{Data?.email}</p>
      <p>
        <button>Contact</button>
      </p>
    </div>
  );
}
export default function FarmerProfile() {
  return <div>{card("Ahmed Rao", "Farmer", "ahmed@gmail.com")}</div>;
}
