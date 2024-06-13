import React from "react";
import PropTypes from "prop-types";
import styles from "./photo.module.css";
const Photos = ({
  photoUrl = "default-image-url.jpg",
  altText = "default alt text",
}) => {
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <img
        style={{ width: "200px", height: "200px" }}
        src={photoUrl}
        alt={altText}
        className={styles["photoo"]}
      />
    </div>
  );
};

Photos.propTypes = {
  photoUrl: PropTypes.string,
  altText: PropTypes.string,
};

export default Photos;
