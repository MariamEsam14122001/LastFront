import React from "react";
import styles from "./head.module.css";
import image from "../pictures/image.png";
//import SearchForm from "../searchbar/SearchBar";

const Head = (props) => {
  return (
    <div className={styles["head"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <img src={image} className={styles["image"]} />

      <span className={styles["text16"]}>
        <span>
          <span>Second Home</span>
          <br></br>
          <span> Find your SecondHome in second</span>
        </span>
      </span>
    </div>
  );
};

export default Head;
