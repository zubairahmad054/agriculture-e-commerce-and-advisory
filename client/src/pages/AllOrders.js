import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./basics/Layout";
import { NavLink, useNavigate } from "react-router-dom";

const AllOrders = () => {
  const history = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await Axios.get("http://localhost:1337/allOrders")
        .then((result) => {
          setOrders(result.data);
        })
        .catch((error) => {
          alert(error);
          // navigator('/',{replace:true})
        });
    };

    getData();
  }, []);
  console.log(orders);

  const deliver = async (id, state) => {
    await Axios.post("http://localhost:1337/updateOrder", {
      id: id,
      state: state,
    })
      .then(() => {
        // alert("Status Updated");
        history(0);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className=" px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              All Orders
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
              All orders are displayed here
            </p>
          </div>
          <div className="lg:w-3/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr className="border-2 border-black">
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Product
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Address
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>

                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Quantity / Renting Period
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Image
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    Modify
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((data, i) => (
                  <tr className="border-2 border-black text-white">
                    <td className="px-4 py-3">{data?.name}</td>
                    <td className="px-4 py-3">{data?.product?.name}</td>
                    <td className="px-4 py-3">{data?.address}</td>
                    <td className="px-4 py-3">{data?.email}</td>
                    <td className="px-4 py-3 text-lg text-white">
                      {data?.price}PKR
                    </td>

                    <td className="px-4 py-3 text-lg text-center text-white">
                      {data?.product?.category == "Rent"
                        ? `${data?.product?.range?.startDate.slice(
                            0,
                            10
                          )} to  ${data?.product?.range?.endDate.slice(0, 10)} `
                        : data?.quantity}
                    </td>
                    <td className="px-4 py-3 text-lg text-white">
                      <NavLink to={`/products/${data?.product?._id}`}>
                        {" "}
                        <img
                          src={data?.product?.image}
                          className="w-10 h-10 object-contain"
                          alt=""
                        />
                      </NavLink>
                    </td>
                    <td className="w-10 text-center text-white">
                      {data.delivered && (
                        <div className="text-xs cursor-pointer font-semibold p-2 mr-4 bg-green-600 text-white rounded-lg ">
                          Delivered
                        </div>
                      )}
                      {!data.delivered && (
                        <div
                          onClick={() => {
                            deliver(data?._id, 1);
                          }}
                          className="text-xs cursor-pointer font-semibold p-2 mr-4 bg-white text-black rounded-lg "
                        >
                          Not Delivered
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllOrders;
