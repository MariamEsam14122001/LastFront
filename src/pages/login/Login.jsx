import React, { useState } from "react";
import Welcome from "../../componets/welcome/Welcome";
import styles from "./login.module.css";
import img from "../pictures/logsign.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAuthToken,
  setUserRole,
  setUserProfile,
} from "../../redux/authSlice"; // Updated import

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      const token = response.data.token;
      const user = response.data.user;
      const email = formData.email;

      // Check if the user is an admin based on email
      const isAdmin = email.endsWith("@example.com");
      const userType = isAdmin ? "admin" : response.data.userType;

      // Store in sessioStorage and Redux
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userRole", userType);
      sessionStorage.setItem("userProfile", JSON.stringify(user));
      dispatch(setAuthToken(token));
      dispatch(setUserRole(userType));
      dispatch(setUserProfile(user));

      console.log("Login successful:", response.data);
      navigateToRolePage(userType);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const navigateToRolePage = (role) => {
    if (role === "admin") {
      navigate("/Admin");
    } else if (role === "owner") {
      navigate("/owner");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Welcome image={img} />
      <form onSubmit={handleSubmit} className={styles["container"]}>
        <div className={styles["component1"]}>
          <div className={styles["frameusersignup"]}>
            <span className={styles["text"]}>Login</span>
            <div>
              <span className={styles["details"]}></span>
            </div>
            <div className={styles["email-address"]}>
              <span>Email Address</span>
            </div>
            <input
              type="email"
              id="email"
              placeholder="Enter your @mail"
              required
              className={styles["email"]}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className={styles["pass"]}>
              <span>Password</span>
            </span>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className={styles["password"]}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className={styles["button"]}>
              <span className={styles["login"]}>Login</span>
            </button>
            <div>
              <span className={styles["do"]}>Do not have an account?</span>
              <Link to="/Getstarted" className={styles["signup"]}>
                Signup
              </Link>
            </div>
            <Link to="/" className={styles["home"]}>
              Go back to Home
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
