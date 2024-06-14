import { React, useState, useEffect } from "react";
import Header from "../../componets/header/Header.jsx";
import Head from "../../componets/header/Head.jsx";
import Footer from "../../componets/footer/Footer.jsx";
//import AccommodationList from ".../componets/AccommodationList.jsx";
//import RecommendedList from "../componets/RecommendedList.jsx";
import styles from "./home.module.css";
import Title from "../../componets/title/Title.jsx";
//import accommodationsData from "./accommodations.json";
import SearchBar from "../../componets/searchbar/SearchBar.jsx";
import { /*Link,*/ useNavigate } from "react-router-dom";
import axios from "axios";
import Items from "../../componets/item/Items.jsx";
import { useSelector } from "react-redux";

const Home = () => {
  const authToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  //GPT
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8000/api/recommendation_system_output`,
        // `http://localhost:8000/api/accommodation/some`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log("Fetched data:", jsonData); // Add logging for debugging
      setData(jsonData.accommodations || []); // Access the accommodations property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const [accommodations, setAccommodations] = useState([]);

  // useEffect(() => {
  //   fetchAccommodations();
  // }, []);

  // const fetchAccommodations = async () => {
  //   try {
  //     const token = sessionStorage.getItem("authToken");
  //     const response = await axios.get(
  //       //`http://localhost:8000/api/recommendation_system_output`,
  //       `http://localhost:8000/api/accommodation/some`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setAccommodations(response.data.accommodations || []);
  //   } catch (error) {
  //     console.error("Error fetching accommodations:", error);
  //   }
  // };

  const [searchResults, setSearchResults] = useState([]);

  // Handle search functionality
  const handleSearch = async (params) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/filtered-accommodations",
        { params }
      );

      setSearchResults(response.data.accommodations || []);
      navigate("/search", {
        state: { searchResults: response.data.accommodations || [] },
      });
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Header />
      <Head />
      <div className={styles.archieve}>
        <SearchBar onSearch={handleSearch} />
      </div>
      {authToken && (
        <div className={styles.title}>
          <Title />
        </div>
      )}
      {authToken && <Items accommodations={data} />}

      <div className={styles.foot}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
