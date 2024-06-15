import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.css";
import Photos from "../../componets/photo/Photo.jsx";
import img from "../pictures/prof.png";
import LogoutButton from "../../componets/logoutbutton/LogoutButton.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";

const Userform = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userProfile = useSelector((state) => state.auth.userProfile); // Access userProfile from Redux

  useEffect(() => {
    if (userProfile) {
      setPhotoUrl(userProfile.photo || "");
      setIsLoading(false);
    } else {
      setError("No user data available");
      setIsLoading(false);
    }
  }, [userProfile]);

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

          {userProfile ? (
            <>
              <div className={styles["full-name"]}>
                <span className={styles["name"]}>Name:</span>
                <p className={styles["nameinput"]}>{userProfile.name}</p>
              </div>

              <div className={styles["email-address"]}>
                <span className={styles["email"]}>Email Address:</span>
                <p className={styles["emailinput"]}>{userProfile.email}</p>
              </div>

              <div>
                <span className={styles["status"]}>Status:</span>
                <p className={styles["statusinput"]}>{userProfile.status}</p>
              </div>

              <span className={styles["gender"]}>Gender:</span>
              <p className={styles["genderinput"]}>{userProfile.gender}</p>

              <span className={styles["age"]}>
                <span>Age:</span>
                <p className={styles["ageinput"]}>{userProfile.age}</p>
              </span>

              <div>
                <span className={styles["phone"]}>Phone:</span>
                <p className={styles["phoneinput"]}>{userProfile.phone}</p>
              </div>
            </>
          ) : (
            <p className={styles["mesg"]}>No user data available</p>
          )}
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
