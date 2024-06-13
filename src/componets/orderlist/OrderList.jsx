import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css"; // Make sure the path to your CSS file is correct

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://your-backend-api-url/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://your-backend-api-url/orders/${id}/accept`);
      setOrderStatus((prevStatus) => ({ ...prevStatus, [id]: "Accepted" }));
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleDefuse = async (id) => {
    try {
      await axios.delete(`http://your-backend-api-url/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error defusing order:", error);
    }
  };

  return (
    <div className={styles.orderlistcontainer}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <table className={styles.orderlisttable}>
        <thead>
          <tr>
            <th>Reference Number</th>
            <th>Image</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.referenceNumber}</td>
              <td>
                <img
                  src={order.imageUrl}
                  alt={`Order ${order.id}`}
                  className={styles.orderlistimage}
                />
              </td>
              <td>{order.endDate}</td>
              <td>
                {orderStatus[order.id] === "Accepted" ? (
                  <span>Accepted</span>
                ) : (
                  <>
                    <button
                      className={styles.orderlistbuttonaccept}
                      onClick={() => handleAccept(order.id)}
                    >
                      Accept
                    </button>
                    <button
                      className={styles.orderlistbuttondefuse}
                      onClick={() => handleDefuse(order.id)}
                    >
                      Defuse
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
