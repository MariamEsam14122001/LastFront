import img from "../pictures/logo.png";
import React, { useState } from "react";
import styles from "./sidebarcomponents.module.css";
import { Link } from "react-router-dom";
const Side = () => {
  const [isUserAccountExpanded, setIsUserAccountExpanded] = useState(false);

  const toggleUserAccount = () => {
    setIsUserAccountExpanded(!isUserAccountExpanded);
  };

  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={styles.navigationbar}>
        <img
          style={{
            position: "absolute",
            top: "-30px",
            height: "110px",
            width: "10%",
          }}
          src={img}
          alt="mego"
        ></img>
      </div>
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <button className={styles.button} onClick={toggleUserAccount}>
              {" "}
              Users Accounts
            </button>
            {isUserAccountExpanded && (
              <div>
                <li>
                  {" "}
                  <Link to="/provider" class={styles.line}>
                    {" "}
                    <button className={styles.buttonchild}>
                      providers accounts
                    </button>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/user" class={styles.line}>
                    {" "}
                    <button className={styles.buttonchild}>
                      users Accounts
                    </button>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/deactivated" class={styles.line}>
                    <button className={styles.buttonchild}>
                      Deactivated Accounts
                    </button>
                  </Link>
                </li>
              </div>
            )}
          </ul>

          <Link to="/accomodations" class={styles.line}>
            <ul className={styles.button1}>Accommodations</ul>
          </Link>

          <Link to="/servicelist" class={styles.line}>
            {" "}
            <ul className={styles.button2}>Service List</ul>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Side;
