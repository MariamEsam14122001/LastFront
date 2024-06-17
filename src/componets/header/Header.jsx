import React from "react";
import { Link } from "react-router-dom";
import logo from "../pictures/logo.png";
import people from "../pictures/people.png";
//import search from '../pictures/search.png';
import wishlist from "../pictures/wishlist.png";
import styles from "./header.module.css";
import { useSelector } from "react-redux";

const Header = (props) => {
  const authToken = useSelector((state) => state.auth.token);
  return (
    <header>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <img src={logo} className={styles["logo"]} />
      <ul className={styles["menu"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Accommodation</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/Getstarted">Get started </Link>
        </li>
        {!authToken && (
          <li>
            <Link to="/Login">Log in</Link>
          </li>
        )}
      </ul>
      <div className={styles["profile-icons"]}>
        {authToken && (
          <>
            <Link to="/userform">
              <img src={people} className={styles["people"]} />
            </Link>
            <Link to="/wishlist">
              <img src={wishlist} className={styles["wishlist"]} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
