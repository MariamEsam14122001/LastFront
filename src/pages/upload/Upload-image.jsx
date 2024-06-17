import React, { useState } from "react";
import styles from "./upload.module.css";
import home from "../pictures/up.png";
import Welcome from "../../componets/welcome/Welcome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Uploadform = () => {
  const navigate = useNavigate();
  const governates = ["Alexandria", "Cairo", "Aswan"];
  const regionsByGovernates = {
    Alexandria: ["Seyouf", "San Stefano", "Louran", "Sidi Bishr"],
    Cairo: ["Maadi", "Heliopolis", "Nasr City", "6th of October"],
    Aswan: ["Daraw", "Edfu", "Abu Simbel"],
  };

  const [regions, setRegions] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    address: "",
    location_link: "",
    region: "",
    price: "",
    facilities: "",
    shared_or_individual: "",
    governorate: "",
    no_of_tenants: "",
  });

  const [selectedFiles, setSelectedFiles] = useState({
    images: [],
    main_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "governorate") {
      setRegions(regionsByGovernates[value] || []);
      setFormData({ ...formData, region: "", [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setSelectedFiles({ ...selectedFiles, images: Array.from(files) });
    } else {
      setSelectedFiles({ ...selectedFiles, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    selectedFiles.images.forEach((file, index) => {
      data.append(`images[${index}]`, file);
    });

    if (selectedFiles.main_image) {
      data.append("main_image", selectedFiles.main_image);
    }

    // Log FormData contents for debugging
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
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
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Welcome image={home} />

      <form onSubmit={handleSubmit} className={styles.uploadform}>
        <span className={styles["upload-your-image-text"]}>
          Upload Your Images
        </span>

        <span className={styles.specstext}>Apartment Description :</span>
        <input
          onChange={handleChange}
          name="description"
          value={formData.description}
          id="description"
          placeholder="Enter yoor description"
          type="text"
          className={styles.appartmentspecsinput}
        />

        <span className={styles.addresstext}> Address :</span>
        <input
          onChange={handleChange}
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          id="address"
          type="text"
          className={styles.appartmentaddressinput}
        />

        <span className={styles.no_of_tenants}>Number of Tenants :</span>
        <input
          onChange={handleChange}
          name="no_of_tenants"
          value={formData.no_of_tenants}
          id="no_of_tenants"
          placeholder="Enter your number of tenants"
          type="text"
          className={styles.no_of_tenantsinput}
        />

        <span className={styles.main_image}>Main Image :</span>
        <div>
          <input
            className={styles.main_imagee}
            type="file"
            name="main_image"
            onChange={handleFileChange}
          />
          {selectedFiles.main_image && (
            <p className={styles.main_ima}>{selectedFiles.main_image.name}</p>
          )}
        </div>

        <span className={styles.locationtext}>Location Link :</span>
        <input
          onChange={handleChange}
          name="location_link"
          value={formData.location_link}
          id="location_link"
          placeholder="Enter your location link"
          type="text"
          className={styles.locationinput}
        />

        <span className={styles.regiontext}>Region :</span>
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className={styles.regioninput}
        >
          <option value="" className={styles.select}>
            Select Region
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <span className={styles.rentaltext}>Rental Price :</span>
        <input
          onChange={handleChange}
          name="price"
          value={formData.price}
          placeholder="Enter your rental price"
          id="price"
          type="text"
          className={styles.rentalpriceinput}
        />

        <span className={styles.phonetext}>Facilities :</span>
        <input
          onChange={handleChange}
          name="facilities"
          value={formData.facilities}
          id="facilities"
          placeholder="Enter your facilities"
          type="text"
          className={styles.phonenumberinput}
        />

        <span className={styles.ortext}>Shared Or Individual Apartment?</span>
        <input
          onChange={handleChange}
          value="shared"
          id="shared"
          type="radio"
          name="shared_or_individual"
          className={styles.sharedradio}
        />
        <span className={styles.sharedtext}>Shared :</span>
        <input
          onChange={handleChange}
          value="individual"
          id="individual"
          type="radio"
          name="shared_or_individual"
          className={styles.invidualradio}
        />
        <span className={styles.invidualtext}>Individual :</span>

        <span className={styles.governoratetext}> city :</span>
        <div>
          <select
            name="governorate"
            value={formData.governorate}
            onChange={handleChange}
            className={styles.city}
          >
            <option value="">Select Governorate</option>
            {governates.map((governorate) => (
              <option key={governorate} value={governorate}>
                {governorate}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.browse}>
          <div className={styles.browseimage}>
            <div>
              <input
                className={styles.text}
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
              />
              {selectedFiles.images.length > 0 && (
                <p className={styles.teext}>
                  Selected files:{" "}
                  {selectedFiles.images.map((file) => file.name).join(", ")}
                </p>
              )}
            </div>
            <span className={styles.text04}>
              Supports: PNG, JPG, JPEG, WEBP
            </span>
          </div>
        </div>

        <button type="submit" className={styles.donebutton}>
          <span className={styles.text12}>Done</span>
        </button>
      </form>
    </>
  );
};

export default Uploadform;
