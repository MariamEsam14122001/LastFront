import React from "react";
import "aframe";
import styles from "./vr.module.css";

const PanoramaViewer = ({ imageUrl }) => {
  return (
    <div className={styles["panorama-container"]}>
      <a-scene className={styles["overlay"]}>
        <a-sky src={imageUrl}></a-sky>
      </a-scene>
    </div>
  );
};

export default PanoramaViewer;
