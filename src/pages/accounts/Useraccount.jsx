import React, { useState, useRef, useEffect } from "react";
import styles from "./useraccount.module.css";
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/authSlice";
import axios from "axios";

const Useform = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData({
        ...formData,
        photo: file.name,
      });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    // photo: null,
  });
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      setUserId(parsedProfile.id);
      setFormData(parsedProfile); // Pre-fill the form with existing user data
    } else {
      console.error("User profile not found in sessionStorage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    //     // Validate password strength
    //     const passwordRegex =
    //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    //     if (!passwordRegex.test(formData.password)) {
    //       alert(
    //         "Password should contain at least 8 characters, including letters, numbers, and symbols."
    //       );
    //       return;
    //     }
    const data = {
      name: formData.name,
      email: formData.email,
      status: formData.status,
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender,
      password: formData.password,
      // photo: null,
    };
    if (selectedFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        data.photo = base64String;
        updateProfile(data);
      };
      reader.readAsDataURL(selectedFiles);
    } else {
      updateProfile(data);
    }
  };

  const updateProfile = async (data) => {
    if (!data.photo) {
      delete data.photo;
    }
    const queryString = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&");

    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/profile/${userId}/update`,
        queryString,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;
      console.log("Update successful:", updatedUser);

      dispatch(setUserProfile(updatedUser));

      sessionStorage.setItem("userProfile", JSON.stringify(updatedUser));

      navigate("/userform");
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
          <span className={styles["userprofile"]}>Account Setting</span>
          <div className={styles["full-name"]}>
            <span className={styles["name"]}>Name :</span>
          </div>
          <input
            onChange={handleChange}
            name="name"
            value={formData.name}
            id="name"
            placeholder="Enter your name"
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
            placeholder="Enter your password"
            value={formData.password}
            id="password"
            type="password"
            className={styles["passwordinput"]}
          />
          <div>
            <span className={styles["status"]}>Status :</span>
          </div>
          <input
            onChange={handleChange}
            name="status"
            placeholder="Enter your status"
            value={formData.status}
            id="status"
            type="text"
            className={styles["statusinput"]}
          />
          <span className={styles["gender"]}>Gender :</span>
          <input
            onChange={handleChange}
            name="gender"
            value={formData.gender}
            id="gender"
            placeholder="Enter your gender"
            type="text"
            className={styles["genderinput"]}
          />{" "}
          <span className={styles["age"]}>
            <span>Age :</span>
          </span>
          <input
            onChange={handleChange}
            name="age"
            value={formData.age}
            id="age"
            placeholder="Enter your age"
            type="text"
            className={styles["ageinput"]}
          />
          <div>
            <span className={styles["phone"]}>Phone :</span>
          </div>
          <input
            onChange={handleChange}
            name="phone"
            placeholder="Enter your phone"
            value={formData.phone}
            id="phone"
            type="text"
            className={styles["phoneinput"]}
          />
          <button type="submit" className={styles["button"]}>
            <span className={styles["accountsetting"]}>Update profile</span>
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
          {selectedFiles && (
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

export default Useform;

// const Useform = () => {
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleBrowseClick = () => {
//     fileInputRef.current.click();
//   };

//   const [selectedFiles, setSelectedFiles] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFiles(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setFormData({
//         ...formData,
//         photo: file.name,
//       });
//     }
//   };

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     status: "",
//     phone: "",
//     age: "",
//     gender: "",
//     password: "",
//     // photo: null,
//   });
//   const [userId, setUserId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   useEffect(() => {
//     const userProfile = sessionStorage.getItem("userProfile");
//     if (userProfile) {
//       const parsedProfile = JSON.parse(userProfile);
//       setUserId(parsedProfile.id);
//       setFormData(parsedProfile); // Pre-fill the form with existing user data
//     } else {
//       console.error("User profile not found in sessionStorage");
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     // Validate password strength
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     if (!passwordRegex.test(formData.password)) {
//       alert(
//         "Password should contain at least 8 characters, including letters, numbers, and symbols."
//       );
//       return;
//     }
//     const data = {
//       name: formData.name,
//       email: formData.email,
//       status: formData.status,
//       phone: formData.phone,
//       age: formData.age,
//       gender: formData.gender,
//       password: formData.password,
//       // photo: null,
//     };
//     if (selectedFiles) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result;
//         data.photo = base64String;
//         updateProfile(data);
//       };
//       reader.readAsDataURL(selectedFiles);
//     } else {
//       updateProfile(data);
//     }
//   };

//   const updateProfile = async (data) => {
//     const queryString = Object.keys(data)
//       .map((key) => `${key}=${encodeURIComponent(data[key])}`)
//       .join("&");

//     const token = sessionStorage.getItem("authToken");
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/user/profile/${userId}/update`,
//         queryString,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const updatedUser = response.data.user;
//       console.log("Update successful:", updatedUser);

//       dispatch(setUserProfile(updatedUser));

//       sessionStorage.setItem("userProfile", JSON.stringify(updatedUser));

//       navigate("/userform");
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

// export default Useform;
