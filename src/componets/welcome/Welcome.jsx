import React from "react";
import styles from "./welcome.module.css";

const Welcome = ({ image }) => {
  return (
    <div className={styles["welcomecomponent"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <span className={styles["text"]}> Welcome To SecondHome</span>
      <img alt={"image"} src={image} className={styles["image"]} />
    </div>
  );
};

// alt={props.iMAGEAlt}
// src={props.iMAGESrc}

export default Welcome;
