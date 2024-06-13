import React from "react";
import styles from "./item.module.css";
import loc from "../pictures/location.png";
import HeartButton from "../heart/Heart";
import { WishlistProvider } from "../../Context/WishlistContext";

function Item({
  id,
  title,
  price,
  location,
  main_image,
  description,
  shared_or_individual,
  region,
}) {
  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={styles["card"]}>
        <div className="col card ">
          <div className={styles["item"]}>
            <div className={styles["wishlist"]}>
              <WishlistProvider>
                <HeartButton id={id} />
              </WishlistProvider>
            </div>

            <div className={styles["content"]}>
              <div className={styles["frame53"]}>
                <span className={styles["text"]}>{title}</span>
                <span className={styles["text2"]}>{price}</span>
              </div>
              <p>{description}</p>
              <div className={styles["frame52"]}>
                <img src={loc} className={styles["locationonblack24dp2"]} />
                <span className={styles["text4"]}>{location}</span>
              </div>
              <span className={styles["text"]}>{shared_or_individual}</span>
              <span className={styles["text"]}>{region}</span>
            </div>
            <img src={main_image} alt={title} className={styles["image"]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
