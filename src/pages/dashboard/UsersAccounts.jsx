import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "../../componets/sidebar/Sidebarcomponents.jsx";
import Itemsuser from "../../componets/usersitem/Itemsuser.jsx";

const UsersAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts");
        setAccounts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const deleteAccount = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${id}`);
      setAccounts(accounts.filter((account) => account.id !== id));
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
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Side />
      <Itemsuser datasets={accounts} deleteAccount={deleteAccount} />
    </div>
  );
};

export default UsersAccounts;
