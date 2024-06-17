import React, { useState } from "react";
import styles from "./report.module.css";

import axios from "axios";

function Report() {
  const [showPopup, setShowPopup] = useState(false);

  const [report, setReport] = useState("");

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

    formData.append("report", report);

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
      console.log(" send successfully:", response.data);
    } catch (error) {
      console.error("send failed:", error);
    }

    handleClosePopup();
    setReport(null);
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
