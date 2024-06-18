import React from "react";
import styles from "./item.module.css";
import loc from "../pictures/location.png";
import HeartButton from "../heart/Heart";
import { WishlistProvider } from "../../Context/WishlistContext";
import { useNavigate } from "react-router-dom";



function Item({
  id,
  title,
  price,
  location,
  main_image,
  description,
  shared_or_individual,
  region,
  isLiked,
  onToggleLike,
}) {
  const navigate = useNavigate();

  const handleNavigate = (event) => {
    if (!event.target.closest(`.${styles["wishlist"]}`)) {
      navigate(`/details/${id}`);
    }
  };

  const handleHeartClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleLike();
  };

  return (
    <div className={styles["card"]} onClick={handleNavigate}>
      <div className={styles["item"]}>
        <div className={styles["wishlist"]} onClick={handleHeartClick}>
          <WishlistProvider>
            <HeartButton accommodationId={id} isLiked={isLiked} />
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
  );
}

export default Item;
