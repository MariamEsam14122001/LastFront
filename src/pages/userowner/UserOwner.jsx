import React from "react";

import Welcome from "../../componets/welcome/Welcome";
import styles from "./owneruser.module.css";
import image from "../pictures/userowner.png";
import owner from "../pictures/owner.png";
import renter from "../pictures/renter.png";
import { Link } from "react-router-dom";

const UserOwner = () => {
  return (
    <div className={styles["container"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Welcome image={image} />
      <div className={styles["component1"]}>
        <Link to="/Signup/user" className={styles["user"]}>
          <span className={styles["text"]}>I am a renter</span>
          <img alt="man10111" src={renter} className={styles["man1"]} />
        </Link>
        <Link to="/Signup/owner" className={styles["owner"]}>
          <span className={styles["text1"]}>
            <span>I am an Owner</span>
          </span>
          <img alt="broker10107" src={owner} className={styles["broker1"]} />
        </Link>
      </div>
    </div>
  );
};

// Welcome.defaultProps = {
//     iMAGESrc:
//       image ,
//     iMAGEAlt: 'IMAGE',
//   }

//   Welcome.propTypes = {
//     iMAGESrc: PropTypes.string,
//     iMAGEAlt: PropTypes.string,
//   }

export default UserOwner;
