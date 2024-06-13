import React from "react";
import styles from "./AdminDashboard.module.css";
import { Link } from "react-router-dom";
import Side from "../../componets/sidebar/Sidebarcomponents";
const AdminDashboard = () => {
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div>
        <Side />
      </div>
      <div className={styles["managment"]}>
        <Link to="/accomodations">
          <button className={styles["AccommodationList"]}>
            Accommodations List <br></br>Total Number: 3412
          </button>
        </Link>
        <Link to="/user">
          <button className={styles["UserList"]}>
            User List <br></br>Total Number: 3412
          </button>
        </Link>
        <Link to="/provider">
          {" "}
          <button className={styles["providerList"]}>
            Provider List <br></br>Total Number: 3412
          </button>
        </Link>
        <div className={styles["Adminstrators"]}>
          <Link>
            {" "}
            <button className={styles["Admin"]}>Adminstrators</button>
          </Link>
        </div>
        <Link to="/servicelist">
          {" "}
          <button className={styles["Rental"]}>
            Rental <br></br>Total Number: 3412
          </button>
        </Link>
        <Link>
          {" "}
          <button className={styles["financialGrowth"]}>
            Financial Growth <br></br>show details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
/**/
