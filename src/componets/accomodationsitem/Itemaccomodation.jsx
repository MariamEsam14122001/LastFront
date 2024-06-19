import React from "react";
import styles from "./itemaccomodation.module.css";
import loc from "../pictures/location.png";
//import { useParams } from "react-router-dom";
function Itemacco({ id, description, price, location, image, onDelete }) {
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className={styles["card"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="col card ">
        <div className={styles["item"]}>
          <div className={styles["content"]}>
            <div className={styles["frame53"]}>
              <span className={styles["text"]}>
                {id}
                <p>Description:</p>
                {description}
              </span>
              <span className={styles["text2"]}>{price}</span>
            </div>

            <div className={styles["frame52"]}>
              <img
                src={loc}
                alt=""
                className={styles["locationonblack24dp2"]}
              />
              <span className={styles["text4"]}>{location}</span>
            </div>
            <button
              onClick={handleDelete}
              type="submit"
              className={styles.button}
            >
              Delete
            </button>
          </div>
          <img src={image} alt="" className={styles["image"]} />
        </div>
      </div>
    </div>
  );
}

export default Itemacco;
