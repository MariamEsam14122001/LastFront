import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerHeader from "../../componets/header/OwnerHeader.jsx";
import HeadOwner from "../../componets/header/Headowner.jsx";
import ItemsOwner from "../../componets/itemowner/ItemsOwner.jsx";

const Owner = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const token = sessionStorage.getItem("authToken"); // Get the owner's authentication token

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/accommodationsofowner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data.accommodations)) {
        setItems(response.data.accommodations);
      } else {
        setItems([]);
      }
    } catch (error) {
      setError(
        "Error fetching items: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const deleteItem = async (itemId) => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/api/accommodations/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      setError(
        "Error deleting item: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <OwnerHeader />
      <HeadOwner />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ItemsOwner accommodations={items} onDelete={deleteItem} />
    </div>
  );
};

export default Owner;
