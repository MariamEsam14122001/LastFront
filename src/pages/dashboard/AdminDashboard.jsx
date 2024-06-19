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
            Accommodations List
          </button>
        </Link>
        <Link to="/user">
          <button className={styles["UserList"]}>User List</button>
        </Link>
        <Link to="/provider">
          {" "}
          <button className={styles["providerList"]}>Provider List</button>
        </Link>
        <div className={styles["Adminstrators"]}>
          <span className={styles["Admin"]}> Admin log out</span>
        </div>
        <Link to="/servicelist">
          {" "}
          <button className={styles["Rental"]}>Rental list</button>
        </Link>
        <Link to="/deactivated">
          {" "}
          <button className={styles["dectivate"]}>Dectivated users</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

// import React from "react";
// import styles from "./AdminDashboard.module.css";
// import { Link } from "react-router-dom";
// import Side from "../../componets/sidebar/Sidebarcomponents";
// import Logout from "../../componets/logoutbutton/LogoutButton";
// const AdminDashboard = () => {
//   return (
//     <div>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <div>
//         <Side />
//       </div>
//       <div className={styles["managment"]}>
//         <Link to="/accomodations">
//           <button className={styles["AccommodationList"]}>
//             Accommodations List <br></br>Total Number: 3412
//           </button>
//         </Link>
//         <Link to="/user">
//           <button className={styles["UserList"]}>
//             User List <br></br>Total Number: 3412
//           </button>
//         </Link>
//         <Link to="/provider">
//           {" "}
//           <button className={styles["providerList"]}>
//             Provider List <br></br>Total Number: 3412
//           </button>
//         </Link>
//         <div className={styles["Adminstrators"]}>
//           <Link>
//             {" "}
//             <div className={styles["Admin"]}>
//               <Logout />
//             </div>
//           </Link>
//         </div>
//         <Link to="/servicelist">
//           {" "}
//           <button className={styles["Rental"]}>
//             Rental <br></br>Total Number: 3412
//           </button>
//         </Link>
//         <Link>
//           {" "}
//           <button className={styles["financialGrowth"]}>
//             Financial Growth <br></br>show details
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
/**/
