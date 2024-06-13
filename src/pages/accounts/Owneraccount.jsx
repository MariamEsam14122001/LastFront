import React, { useState, useRef, useEffect } from "react";
import styles from "./owneraccount.module.css";
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import axios from "axios";

const Ownform = () => {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    nameinput: "",
    emailinput: "",
    passwordinput: "",
    imageinput: null,
    passwordinput2: "",
    phoneinput: "",
  });

  const [userId, setUserId] = useState(null);
  const [csrfToken, setCsrfToken] = useState(""); // State to store CSRF token

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      setUserId(parsedProfile.id);
    } else {
      console.error("User profile not found in sessionStorage");
    }

    // Fetch CSRF token when component mounts
    // Fetch CSRF token when component mounts
    fetchCsrfToken();

    // Log CSRF token
    console.log("CSRF Token:", csrfToken);
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/csrf-token");
      setCsrfToken(response.data.token);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData({
        ...formData,
        imageinput: file,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageinput" && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.passwordinput !== formData.passwordinput2) {
      alert("Passwords do not match!");
      return;
    }

    if (!userId) {
      console.error("User ID is null. Cannot submit form.");
      return;
    }

    console.log("Submitting form with id:", userId);

    console.log("Submitting form with token:", csrfToken);

    const formDataToSend = new FormData();
    formDataToSend.append("nameinput", formData.nameinput);
    formDataToSend.append("emailinput", formData.emailinput);
    formDataToSend.append("passwordinput", formData.passwordinput);
    if (formData.imageinput) {
      formDataToSend.append("imageinput", formData.imageinput);
    }
    formDataToSend.append("setting", formData.setting);
    const token = sessionStorage.getItem("authToken");

    console.log("Authentication Token:", token);
    // const csrfToken = sessionStorage.getItem("csrfToken");
    try {
      const response = await axios.put(
        `http://localhost:8000/owner/profile/${userId}/update`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            // Include CSRF token if necessary
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );
      console.log("Changing data successful:", response.data);
    } catch (error) {
      console.error("Changing data failed:", error);
    }
  };

  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Header />
      <form onSubmit={handleSubmit}>
        <div className={styles["form"]}>
          <span className={styles["userprofile"]}>Account setting</span>
          <div className={styles["full-name"]}>
            <span className={styles["name"]}>Name :</span>
          </div>
          <input
            onChange={handleChange}
            name="nameinput"
            value={formData.nameinput}
            id="nameinput"
            type="text"
            className={styles["nameinput"]}
          />

          <div className={styles["email-address"]}>
            <span className={styles["email"]}>Email Address :</span>
          </div>

          <input
            onChange={handleChange}
            name="emailinput"
            value={formData.emailinput}
            id="emailinput"
            type="text"
            className={styles["emailinput"]}
          />

          <div className={styles["password"]}>
            <span className={styles["password1"]}>Password :</span>
          </div>

          <input
            onChange={handleChange}
            name="passwordinput"
            value={formData.passwordinput}
            id="passwordinput"
            type="password"
            className={styles["passwordinput"]}
          />

          <span className={styles["password2"]}>Confirm Password :</span>

          <input
            onChange={handleChange}
            name="passwordinput2"
            value={formData.passwordinput2}
            id="passwordinput2"
            type="password"
            className={styles["passwordinput2"]}
          />

          <span className={styles["phone1"]}>phone :</span>

          <input
            onChange={handleChange}
            name="phoneinput"
            value={formData.phoneinput}
            id="phoneinput"
            type="phone"
            className={styles["phoneinput"]}
          />

          <button
            name="setting"
            id="setting"
            type="submit"
            value={formData.setting}
            className={styles["button"]}
          >
            <span className={styles["change"]}>Update Profile</span>
          </button>
        </div>
        <div className={styles["upload-container"]}>
          <div className={styles["browse-button"]} onClick={handleBrowseClick}>
            Change Photo
          </div>
          <input
            ref={fileInputRef}
            name="imageinput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className={styles["image-preview"]}>
              <img
                src={previewUrl}
                alt="Preview"
                className={styles["image-preview-img"]}
              />
            </div>
          )}
        </div>
      </form>
      <div className={styles["foot"]}>
        <Footer />
      </div>
    </>
  );
};

export default Ownform;
