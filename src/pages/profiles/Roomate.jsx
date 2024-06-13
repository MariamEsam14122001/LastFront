import React, { useState, useEffect } from "react";

import styles from "./roomatte.module.css";
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import axios from "axios";

const Roommatte = () => {
  const [roommateData, setRoommateData] = useState({
    name: "",
    gender: "",
    age: "",
    city: "",
    phone: "",
    photoUrl: "", // Add photoUrl state to store the URL of the user's photo
  });

  useEffect(() => {
    // Fetch roommate data from the backend
    axios
      .get("http://localhost:8000/api/roommate")
      .then((response) => {
        setRoommateData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roommate data:", error);
      });
  }, []);

  return (
    <>
      <div>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <Header />
        {/* Display user's photo */}
        {roommateData.photoUrl && (
          <img
            src={roommateData.photoUrl}
            alt="photo"
            className={styles["photo"]}
          />
        )}
      </div>
      <div>
        <div className={styles["form"]}>
          <span className={styles["userprofile"]}>Roommate</span>

          <div className={styles["full-name"]}>
            <label className={styles["name"]}>Name:</label>
          </div>
          <p className={styles["nameinput"]}>{roommateData.name}</p>

          <label className={styles["gender"]}>Gender:</label>
          <p className={styles["genderinput"]}>{roommateData.gender}</p>

          <label className={styles["age"]}>Age:</label>
          <p className={styles["ageinput"]}>{roommateData.age}</p>

          <label className={styles["city"]}>City:</label>
          <p className={styles["cityinput"]}>{roommateData.city}</p>

          <div>
            <label className={styles["phone"]}>Phone:</label>
          </div>
          <p className={styles["phoneinput"]}>{roommateData.phone}</p>

          <button name="setting" id="setting" className={styles["button"]}>
            <span className={styles["accountsetting"]}>Report</span>
          </button>
        </div>
      </div>
      <div className={styles["foot"]}>
        <Footer />
      </div>
    </>
  );
};

export default Roommatte;
