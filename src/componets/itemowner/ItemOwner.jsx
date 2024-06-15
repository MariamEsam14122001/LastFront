import React from "react";
import styles from "./itemowner.module.css";
import loc from "../pictures/location.png";
import img from "../pictures/delete.svg";

const ItemOwner = ({
  id,
  title,
  price,
  location,
  description,
  shared_or_individual,
  region,
  image,
  onDelete,
}) => {
  const handleDelete = (event) => {
    event.preventDefault(); // Prevent the default anchor tag behavior
    event.stopPropagation(); // Prevent the Link from being triggered
    onDelete(id);
  };

  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={styles["card"]}>
        <div className="col card">
          <div className={styles["item"]}>
            <div className={styles["content"]}>
              <div className={styles["frame53"]}>
                <span className={styles["text"]}>{title}</span>
                <span className={styles["text2"]}>{price}</span>
              </div>
              <p>{description}</p>
              <div className={styles["frame52"]}>
                <img
                  src={loc}
                  className={styles["locationonblack24dp2"]}
                  alt="location icon"
                />
                <span className={styles["text4"]}>{location}</span>
              </div>
              <span className={styles["text"]}>{shared_or_individual}</span>
              <span className={styles["text"]}>{region}</span>
            </div>
            <img src={image} alt={title} className={styles["image"]} />
            <div onClick={handleDelete} className={styles["delete"]}>
              <img src={img} alt="delete" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemOwner;
