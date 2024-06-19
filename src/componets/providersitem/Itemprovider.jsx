import React from "react";
import styles from "./itemprovider.module.css";

function Itemprov({ id, name, age, email, image, onDelete }) {
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
                {name}
              </span>
              <span className={styles["text2"]}>{age}</span>
            </div>

            <div className={styles["frame52"]}>
              <span className={styles["text4"]}>{email}</span>
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

export default Itemprov;
