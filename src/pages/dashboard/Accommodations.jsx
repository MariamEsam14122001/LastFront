import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Side from "../../componets/sidebar/Sidebarcomponents.jsx";
import Itemsacco from "../../componets/accomodationsitem/Itemsaccomodation.jsx";
import axios from "axios";

function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts");
        setAccommodations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const deleteAccommodation = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${id}`);
      setAccommodations(
        accommodations.filter((accommodation) => accommodation.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Side />
      <Itemsacco
        datasets={accommodations}
        deleteAccommodation={deleteAccommodation}
      />
    </div>
  );
}

export default Accommodations;
