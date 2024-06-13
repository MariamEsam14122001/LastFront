import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import Side from "../../componets/sidebar/Sidebarcomponents.jsx";
import Items2 from "../../componets/item2/Items2.jsx";
import axios from "axios";
function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts");
        setAccommodations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Side />
      <Items2 datasets={accommodations} />
    </div>
  );
}
export default Accommodations;
/**/
