import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.css";
import Photos from "../../componets/photo/Photo.jsx";
//import img from "../pictures/prof.png";
import LogoutButton from "../../componets/logoutbutton/LogoutButton.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import axios from "axios";

const Userform = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userProfile = useSelector((state) => state.auth.userProfile); // Access userProfile from Redux
  const token = useSelector((state) => state.auth.token); // Assuming token is stored in Redux

  useEffect(() => {
    // console.log("User Profile:", userProfile); // Log userProfile

    const fetchPhotoUrl = async () => {
      if (userProfile && userProfile.photo) {
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
  }, [userProfile, token]);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Header />
      <div>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Photos photoUrl={photoUrl} altText="" />
          )}
        </div>
        <div className={styles["form"]}>
          <span className={styles["userprofile"]}>User Profile</span>

          <div className={styles["full-name"]}>
            <span className={styles["name"]}>Name:</span>
            <p className={styles["nameinput"]}>
              {userProfile && userProfile.name}
            </p>
          </div>

          <div className={styles["email-address"]}>
            <span className={styles["email"]}>Email Address:</span>
            <p className={styles["emailinput"]}>
              {userProfile && userProfile.email}
            </p>
          </div>

          <div>
            <span className={styles["status"]}>Status:</span>
            <p className={styles["statusinput"]}>
              {userProfile && userProfile.status}
            </p>
          </div>

          <div>
            <span className={styles["gender"]}>Gender:</span>
            <p className={styles["genderinput"]}>
              {userProfile && userProfile.gender}
            </p>
          </div>

          <div className={styles["age"]}>
            <span>Age:</span>
            <p className={styles["ageinput"]}>
              {userProfile && userProfile.age}
            </p>
          </div>

          <div>
            <span className={styles["phone"]}>Phone:</span>
            <p className={styles["phoneinput"]}>
              {userProfile && userProfile.phone}
            </p>
          </div>

          <Link to="/Useraccount">
            <button name="setting" id="setting" className={styles["button"]}>
              <span className={styles["accountsetting"]}>Edit Profile</span>
            </button>
          </Link>
          <div className={styles["button1"]}>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className={styles["foot"]}>
        <Footer />
      </div>
    </div>
  );
};

export default Userform;
