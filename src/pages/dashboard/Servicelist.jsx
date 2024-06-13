import React from "react";
import OrderList from "../../componets/orderlist/OrderList.jsx";
import Side from "../../componets/sidebar/Sidebarcomponents.jsx";

const Home = () => {
  return (
    <div className="home-container">
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Side />
      <OrderList />
    </div>
  );
};

export default Home;
