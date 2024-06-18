import React, { useState, useRef, useEffect } from "react";
import styles from "./owneraccount.module.css";
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/authSlice";
import axios from "axios";

const Ownform = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    photo: null,
  });
  const [userId, setUserId] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      setUserId(parsedProfile.id);
      setFormData(parsedProfile); // Pre-fill the form with existing user data
    } else {
      console.error("User profile not found in sessionStorage");
    }

    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/csrf-token");
      setCsrfToken(response.data.token);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData({ ...formData, photo: file });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password strength
    // const passwordRegex =
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // if (!passwordRegex.test(formData.password)) {
    //   alert(
    //     "Password should contain at least 8 characters, including letters, numbers, and symbols."
    //   );
    //   return;
    // }
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        data.photo = base64String;
        updateProfile(data);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      updateProfile(data);
    }
  };

  const updateProfile = async (data) => {
    const queryString = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&");

    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `http://localhost:8000/api/owner/profile/${userId}/update`,
        queryString,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
            // "X-CSRF-TOKEN": csrfToken,
          },
        }
      );

      const updatedUser = response.data.user;
      dispatch(setUserProfile(updatedUser));
      sessionStorage.setItem("userProfile", JSON.stringify(updatedUser));
      navigate("/ownerform");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Header />
      <form onSubmit={handleSubmit}>
        <div className={styles["form"]}>
          <div className={styles["space"]}></div>
          <span className={styles["userprofile"]}>Account setting</span>
          <div className={styles["full-name"]}>
            <span className={styles["name"]}>Name :</span>
          </div>
          <input
            onChange={handleChange}
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            id="name"
            type="text"
            className={styles["nameinput"]}
          />

          <div className={styles["email-address"]}>
            <span className={styles["email"]}>Email Address :</span>
          </div>

          <input
            onChange={handleChange}
            name="email"
            placeholder="Enter your @mail"
            value={formData.email}
            id="email"
            type="text"
            className={styles["emailinput"]}
          />

          <div className={styles["password"]}>
            <span className={styles["password1"]}>Password :</span>
          </div>

          <input
            onChange={handleChange}
            name="password"
            value={formData.password}
            id="password"
            placeholder="Entre your password"
            type="password"
            className={styles["passwordinput"]}
          />

          <span className={styles["phone1"]}>phone :</span>

          <input
            onChange={handleChange}
            name="phone"
            value={formData.phone}
            id="phone"
            placeholder="Enter your phone"
            type="phone"
            className={styles["phoneinput"]}
          />

          <button
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
            name="photo"
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
