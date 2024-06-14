// SearchPageResults.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../componets/searchbar/SearchBar";
import styles from "./SearchPage.module.css";
import Items from "../../componets/item/Items";

const SearchPageResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      setSearchResults(location.state.searchResults);
    } else {
      fetchInitialData();
    }
  }, [location]);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/filtered-accommodations"
      );
      setSearchResults(response.data.accommodations || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setSearchResults([]);
    }
  };

  const handleSearch = async (params) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/filtered-accommodations",
        { params }
      );

      setSearchResults(response.data.accommodations || []);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={styles["header"]}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <Items accommodations={searchResults} />
    </div>
  );
};

export default SearchPageResults;
