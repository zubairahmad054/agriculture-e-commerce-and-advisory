import React from "react";
import { NavLink } from "react-router-dom";
const MenuCard = ({ menuData }) => {
  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
          return (
            <NavLink to={`/products/${curElem._id}`}>
              <div
                className="card-container rounded-xl shadow-2xl"
                key={curElem._id}
              >
                <div className="card rounded-xl">
                  <div className="card-body rounded-xl">
                    {/* <span className="card-number card-circle subtle">
                      {curElem._id}
                    </span> */}
                    {/* <span className="card-author subtle">{curElem.name} </span> */}
                    <h2 className=" text-4xl my-2">{curElem.category !== "Rent"
                        ? curElem.name.split("/")[0]
                        : `${curElem.name.split("/")[0]} / ${
                            curElem.name.split("/")[1]
                          }`} </h2>
                    {/* <span className="card-description subtle">
                     {" "}
                    </span> */}
                    {/* <div className="font-semibold text-xs truncate">
                      {" "}
                      {curElem.description}
                    </div> */}
                  </div>
                  <img
                    src={curElem.image}
                    alt="images"
                    className="card-media rounded-xl"
                  />
                  {/* <span className="card-tag subtle">Order Now</span> */}
                </div>
              </div>
            </NavLink>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;
