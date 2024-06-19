import React, { useState, useEffect } from "react";
import Report from "../../componets/report/Report.jsx";
import styles from "./roomatte.module.css";
import Header from "../../componets/header/Header.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

const Roommatte = () => {
  const { id } = useParams();
  const [roommateData, setRoommateData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoommateData = async () => {
      if (!id) {
        console.error("Roommate user ID is not defined.");
        setError("Roommate user ID is not defined.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rental/user/${id}`
        );
        setRoommateData(response.data);
      } catch (error) {
        console.error("Error fetching roommate data:", error);
        setError(error.message);
      }
    };

    fetchRoommateData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!roommateData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <Header />
      </div>
      <div>
        <div className={styles["form"]}>
          <span className={styles["userprofile"]}>Roommate</span>

          <div className={styles["full-name"]}>
            <label className={styles["name"]}>Name:</label>
          </div>
          <p className={styles["nameinput"]}>{roommateData.name}</p>

          <label className={styles["gender"]}>Gender:</label>
          <p className={styles["genderinput"]}>{roommateData.gender}</p>

          <label className={styles["age"]}>Age:</label>
          <p className={styles["ageinput"]}>{roommateData.age}</p>

          <label className={styles["city"]}>City:</label>
          <p className={styles["cityinput"]}>{roommateData.city}</p>

          <div>
            <label className={styles["phone"]}>Phone:</label>
          </div>
          <p className={styles["phoneinput"]}>{roommateData.phone}</p>

          <div className={styles["button"]}>
            <Report id={id}/>
          </div>
        </div>
      </div>
      <div className={styles["foot"]}>
        <Footer />
      </div>
    </>
  );
};

export default Roommatte;

// const Roommatte = () => {
//   const [roommateData, setRoommateData] = useState({
//     name: "",
//     gender: "",
//     age: "",
//     city: "",
//     phone: "",
//   });

//   useEffect(() => {
//     // Fetch roommate data from the backend
//     axios
//       .get("http://localhost:8000/api/roommate")
//       .then((response) => {
//         setRoommateData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching roommate data:", error);
//       });
//   }, []);

//   return (
//     <>
//       <div>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />

//         <Header />
//       </div>
//       <div>
//         <div className={styles["form"]}>
//           <span className={styles["userprofile"]}>Roommate</span>

//           <div className={styles["full-name"]}>
//             <label className={styles["name"]}>Name:</label>
//           </div>
//           <p className={styles["nameinput"]}>{roommateData.name}</p>

//           <label className={styles["gender"]}>Gender:</label>
//           <p className={styles["genderinput"]}>{roommateData.gender}</p>

//           <label className={styles["age"]}>Age:</label>
//           <p className={styles["ageinput"]}>{roommateData.age}</p>

//           <label className={styles["city"]}>City:</label>
//           <p className={styles["cityinput"]}>{roommateData.city}</p>

//           <div>
//             <label className={styles["phone"]}>Phone:</label>
//           </div>
//           <p className={styles["phoneinput"]}>{roommateData.phone}</p>

//           <div className={styles["button"]}>
//             <Report />
//           </div>
//         </div>
//       </div>
//       <div className={styles["foot"]}>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Roommatte;
