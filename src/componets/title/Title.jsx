import React from "react";
import styles from "./title.module.css";

const Title = () => {
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h1 className={styles["text"]}> Recommended Properties in Egypt </h1>;
    </div>
  );
};

export default Title;
