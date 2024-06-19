import React, { useState } from "react";
import styles from "./report.module.css";
import { useSelector } from "react-redux";
import axios from "axios";

function Report({ id }) {
  const [showPopup, setShowPopup] = useState(false);
  const [report, setReport] = useState("");

  // Get the current user's ID from the Redux store
  const userId = useSelector((state) => state.auth.userProfile?.id);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleReport = (event) => {
    setReport(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", report);
    formData.append("user_id", id);
    formData.append("commented_by", userId);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Report sent successfully:", response.data);
    } catch (error) {
      console.error("Failed to send report:", error);
    }

    handleClosePopup();
    setReport("");
  };

  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <button className={styles.rent} onClick={handleButtonClick}>
        Report
      </button>

      {showPopup && (
        <form onSubmit={handleSubmit}>
          <div className={styles.popup}>
            <span className={styles.close} onClick={handleClosePopup}>
              &times;
            </span>

            <span className={styles.Report}>why you want to report ? </span>
            <textarea
              className={styles.Enterreport}
              placeholder="Enter your comment if you want ..."
              value={report}
              onChange={handleReport}
              rows="20"
              cols="80"
            />

            <button type="submit">Send</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Report;
