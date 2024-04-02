import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import newRequest from "../../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  console.log("DATA:: ", data);

  return (
    <div className="orders">
      {isLoading ? (
        "loading.."
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => {
              return <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img className="delete" src="./img/message.png" alt="" />
                </td>
              </tr>;
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
