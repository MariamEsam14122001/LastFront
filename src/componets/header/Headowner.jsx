import React from "react";
import styles from "./headowner.module.css";
import image from "../pictures/image.png";

const HeadOwner = () => {
  return (
    <div className={styles["head"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <img src={image} className={styles["image"]} />
    </div>
  );
};

export default HeadOwner;
