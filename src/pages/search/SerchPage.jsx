// SearchPageResults.jsx
import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../../componets/searchbar/SearchBar";
import styles from "./SearchPage.module.css";
//import Items from "../componets/Items.jsx";

const SearchPageResults = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (params) => {
    try {
      const response = await axios.get("/api/search", { params });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={styles["header"]}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/*<Items accommodations={searchResults} />*/}
    </div>
  );
};

export default SearchPageResults;
