import React, { useState } from "react";
import styles from "./rent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

function WhatsAppButton({ accommodationId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [endDate, setEndDate] = useState("");

  const authToken =
    useSelector((state) => state.auth.token) ||
    sessionStorage.getItem("authToken");

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleReferenceNumberChange = (event) => {
    setReferenceNumber(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      alert("You are not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("img", selectedFile); // Ensure this matches the backend variable name
    formData.append("reference_number", referenceNumber);
    formData.append("end_date", endDate);
    formData.append("accommodation_id", accommodationId);

    try {
      console.log("Token retrieved:", authToken);

      const response = await axios.post(
        `http://localhost:8000/api/rental`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`, // Include the token in the request headers
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Form submission failed:", error);
    }

    handleClosePopup();
  };

  const iconStyle = {
    marginRight: "80px",
    color: "#25D366",
    cursor: "pointer",
    position: "absolute",
    top: "54.5rem",
    left: "90rem",
  };

  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <button className={styles.rent} onClick={handleButtonClick}>
        Rent
      </button>

      <a
        href="https://api.whatsapp.com/send?phone=1272682720"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" style={iconStyle} />
      </a>
      {showPopup && (
        <form onSubmit={handleSubmit}>
          <div className={styles.popup}>
            <span className={styles.close} onClick={handleClosePopup}>
              &times;
            </span>
            <span className={styles.img}>Image :</span>
            <div className={styles.browseimage}>
              <div>
                <input
                  className={styles.text}
                  type="file"
                  onChange={handleFileChange}
                  name="image"
                />
                {selectedFile && <p>{selectedFile.name}</p>}
              </div>
            </div>
            <span className={styles.ReferenceNumber}>Reference Number :</span>
            <input
              className={styles.Enterreferencenumber}
              placeholder="Enter reference number"
              value={referenceNumber}
              name="reference_number"
              onChange={handleReferenceNumberChange}
            />
            <span className={styles.EndDate}>End Date :</span>
            <input
              type="date"
              className={styles.dateinput}
              value={endDate}
              name="end_date"
              onChange={handleEndDateChange}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default WhatsAppButton;
