import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./upload.module.css";
import home from "../pictures/up.png";
import Welcome from "../../componets/welcome/Welcome";

const OwnersEdit = () => {
  const { id } = useParams();

  const cities = ["Alexandria", "Aswan", "Cairo"];

  const [propertyData, setPropertyData] = useState({
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

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/properties/${id}`
      );
      setPropertyData(response.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setSelectedFiles({
        ...selectedFiles,
        [name]: [...files],
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

    try {
      const formData = new FormData();
      if (selectedFiles) {
        formData.append("images", selectedFiles);
      }
      for (const key in propertyData) {
        formData.append(key, propertyData[key]);
      }

      const response = await axios.put(
        `http://localhost:8000/api/properties/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Property updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Welcome image={home} />

      <form onSubmit={handleSubmit} className={styles["uploadform"]}>
        <span className={styles["upload-your-image-text"]}>
          Edite your properties
        </span>

        <span className={styles["specstext"]}>Apartment Description :</span>
        <input
          onChange={handleChange}
          name="description"
          value={propertyData.description}
          id="description"
          type="text"
          className={styles["appartmentspecsinput"]}
        />

        <span className={styles["addresstext"]}> Address :</span>
        <input
          onChange={handleChange}
          name="address"
          value={propertyData.address}
          id="address"
          type="text"
          className={styles["appartmentaddressinput"]}
        />

        <span className={styles["no_of_tenants"]}>Number of Tenants :</span>
        <input
          onChange={handleChange}
          name="no_of_tenants"
          value={propertyData.no_of_tenants}
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
          value={propertyData.location_link}
          id="location_link"
          type="text"
          className={styles["locationinput"]}
        />

        <span className={styles["regiontext"]}>Region :</span>
        <input
          onChange={handleChange}
          name="region"
          value={propertyData.region}
          id="region"
          type="text"
          className={styles["regioninput"]}
        />

        <span className={styles["rentaltext"]}>Rental Price :</span>
        <input
          onChange={handleChange}
          name="price"
          value={propertyData.price}
          id="price"
          type="text"
          className={styles["rentalpriceinput"]}
        />

        <span className={styles["phonetext"]}>Facilities :</span>
        <input
          onChange={handleChange}
          name="facilities"
          value={propertyData.facilities}
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
            value={propertyData.governorate}
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

export default OwnersEdit;
