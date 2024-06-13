import React from "react";
import styles from "./item2.module.css";
import loc from "../pictures/location.png";

function Item2({ id, name, age, location, image }) {
  return (
    <div className={styles["card"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="col card ">
        <div className={styles["item"]}>
          <div className={styles["wishlist"]}>{}</div>

          <div className={styles["content"]}>
            <div className={styles["frame53"]}>
              <span className={styles["text"]}>
                {id}
                {name}
              </span>
              <span className={styles["text2"]}>{age}</span>
            </div>
            <p>About</p>
            <div className={styles["frame52"]}>
              <img
                src={loc}
                alt=""
                className={styles["locationonblack24dp2"]}
              />
              <span className={styles["text4"]}>{location}</span>
            </div>
          </div>
          <img src={image} alt="" className={styles["image"]} />
        </div>
      </div>
    </div>
  );
}

export default Item2;
