import React, { useState } from "react";
import styles from "./upload.module.css";
import home from "../pictures/up.png";
import Welcome from "../../componets/welcome/Welcome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Uploadform = () => {
  const navigate = useNavigate();

  const cities = [
    "Alexandria",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez",
  ];

  const [formData, setFormData] = useState({
    description: "",
    address: "",
    location_link: "",
    region: "",
    price: "",
    facilities: "",
    shared_or_individual: "",
    city: "",
    no_of_tenants: "",
  });

  const [selectedFiles, setSelectedFiles] = useState({
    images: [],
    main_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setSelectedFiles({
        ...selectedFiles,
        images: Array.from(files),
      });
    } else {
      setSelectedFiles({
        ...selectedFiles,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    selectedFiles.images.forEach((file, index) => {
      data.append(`images`, file);
    });
    if (selectedFiles.main_image) {
      data.append("main_image", selectedFiles.main_image);
    }

    // Log FormData contents
    for (let pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const token = sessionStorage.getItem("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/accommodationform",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", response.data);
      navigate("/owner");
    } catch (error) {
      console.error("Upload failed:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Welcome image={home} />

      <form onSubmit={handleSubmit} className={styles["uploadform"]}>
        <span className={styles["upload-your-image-text"]}>
          Upload Your Images
        </span>

        <span className={styles["specstext"]}>Apartment Description :</span>
        <input
          onChange={handleChange}
          name="description"
          value={formData.description}
          id="description"
          type="text"
          className={styles["appartmentspecsinput"]}
        />

        <span className={styles["addresstext"]}> Address :</span>
        <input
          onChange={handleChange}
          name="address"
          value={formData.address}
          id="address"
          type="text"
          className={styles["appartmentaddressinput"]}
        />

        <span className={styles["no_of_tenants"]}>No of Tenants :</span>
        <input
          onChange={handleChange}
          name="no_of_tenants"
          value={formData.no_of_tenants}
          id="no_of_tenants"
          type="text"
          className={styles["no_of_tenantsinput"]}
        />

        <span className={styles["main_image"]}>Main Image :</span>
        <div>
          <input
            className={styles["main_imagee"]}
            type="file"
            name="main_image"
            onChange={handleFileChange}
          />
          {selectedFiles.main_image && (
            <p className={styles["main_ima"]}>
              {" "}
              {selectedFiles.main_image.name}
            </p>
          )}
        </div>

        <span className={styles["locationtext"]}>Location Link :</span>
        <input
          onChange={handleChange}
          name="location_link"
          value={formData.location_link}
          id="location_link"
          type="text"
          className={styles["locationinput"]}
        />

        <span className={styles["regiontext"]}>Region :</span>
        <input
          onChange={handleChange}
          name="region"
          value={formData.region}
          id="region"
          type="text"
          className={styles["regioninput"]}
        />

        <span className={styles["rentaltext"]}>Rental Price :</span>
        <input
          onChange={handleChange}
          name="price"
          value={formData.price}
          id="price"
          type="text"
          className={styles["rentalpriceinput"]}
        />

        <span className={styles["phonetext"]}>Facilities :</span>
        <input
          onChange={handleChange}
          name="facilities"
          value={formData.facilities}
          id="facilities"
          type="text"
          className={styles["phonenumberinput"]}
        />

        <span className={styles["ortext"]}>
          Shared Or Individual Apartment?
        </span>

        <input
          onChange={handleChange}
          value="shared"
          id="shared"
          type="radio"
          name="shared_or_individual"
          className={styles["sharedradio"]}
        />
        <span className={styles["sharedtext"]}>Shared :</span>
        <input
          onChange={handleChange}
          value="individual"
          id="individual"
          type="radio"
          name="shared_or_individual"
          className={styles["invidualradio"]}
        />
        <span className={styles["invidualtext"]}>Individual :</span>

        <span className={styles["governoratetext"]}> Governorate :</span>
        <div>
          <input
            placeholder="select city"
            className={styles["city"]}
            type="text"
            list="cities"
            name="governorate" // Updated to match the backend field name
            value={formData.governorate}
            onChange={handleChange}
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className={styles["browse"]}>
          <div className={styles["browseimage"]}>
            <div>
              <input
                className={styles["text"]}
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
              />
              {selectedFiles.images.length > 0 && (
                <p className={styles["teext"]}>
                  Selected files:{" "}
                  {selectedFiles.images.map((file) => file.name).join(", ")}
                </p>
              )}
            </div>
            <span className={styles["text04"]}>
              Supports: PNG, JPG, JPEG, WEBP
            </span>
          </div>
        </div>

        <button type="submit" className={styles["donebutton"]}>
          <span className={styles["text12"]}>Done</span>
        </button>
      </form>
    </>
  );
};

export default Uploadform;
