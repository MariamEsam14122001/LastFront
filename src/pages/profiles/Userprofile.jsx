import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./userprofile.module.css";
import Photos from "../../componets/photo/Photo.jsx";
import img from "../pictures/prof.png";
import LogoutButton from "../../componets/logoutbutton/LogoutButton.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
const Userform = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = useSelector((state) => state.auth.userProfile);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPhotoUrl = async () => {
      if (userData && userData.photo) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPhotoUrl(response.data.photoUrl);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching photo URL:", error);
          setError(error.message);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchPhotoUrl();
  }, [userData, token]);

  return (
    <div className={styles["body"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Header />
      <div>
        <div>
          {isLoading ? (
            <p>Loading...</p> // Show loading message if data is being fetched
          ) : error ? (
            <p>Error: {error}</p> // Show error message if there was an error fetching data
          ) : (
            <Photos photoUrl={photoUrl} altText="" />
          )}
        </div>
        <div className={styles["form"]}>
          <span className={styles["userprofile"]}>User Profile</span>

          {/* Check if userData exists before accessing its properties */}
          {userData ? (
            <>
              {/* Render user details if userData is available */}
              <div className={styles["full-name"]}>
                <span className={styles["name"]}>Name:</span>
                <p className={styles["nameinput"]}>{userData.name}</p>
              </div>

              <div className={styles["email-address"]}>
                <span className={styles["email"]}>Email Address:</span>
                <p className={styles["emailinput"]}>{userData.email}</p>
              </div>

              <div>
                <span className={styles["status"]}>Status:</span>
                <p className={styles["statusinput"]}>{userData.status}</p>
              </div>

              <span className={styles["gender"]}>Gender:</span>
              <p className={styles["genderinput"]}>{userData.gender}</p>

              <span className={styles["age"]}>
                <span>Age:</span>
                <p className={styles["ageinput"]}>{userData.age}</p>
              </span>

              <div>
                <span className={styles["phone"]}>Phone:</span>
                <p className={styles["phoneinput"]}>{userData.phone}</p>
              </div>
            </>
          ) : (
            // Fallback message if userData is null
            <p className={styles["mesg"]}>No user data available</p>
          )}
          <Link to="/Useraccount">
            <button name="setting" id="setting" className={styles["button"]}>
              <span className={styles["accountsetting"]}>Edit Profile</span>
            </button>
          </Link>
          <div className={styles["button1"]}>
            <LogoutButton /> {/* Logout button */}
          </div>
        </div>
      </div>
      <div className={styles["foot"]}>
        <Footer />
      </div>
    </div>
  );
};

Userform.propTypes = {
  iMAGESrc: PropTypes.string,
  iMAGEAlt: PropTypes.string,
};

export default Userform;
