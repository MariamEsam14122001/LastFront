import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//import styles from "./upload.module.css";
import styles from "./owneredit.module.css";
import home from "../pictures/up.png";
import Welcome from "../../componets/welcome/Welcome";

const OwnersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cities = ["Alexandria", "Aswan", "Cairo"];

  const [propertyData, setPropertyData] = useState({
    description: "",
    address: "",
    location_link: "",
    governorate: "",
    region: "",
    price: "",
    facilities: "",
    shared_or_individual: "",
    no_of_tenants: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // useEffect(() => {
  //   fetchPropertyData();
  // }, []);

  // const fetchPropertyData = async () => {
  //   try {
  //     const token = sessionStorage.getItem("authToken");
  //     const response = await axios.get(
  //       `http://localhost:8000/api/accommodations/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setPropertyData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching property data:", error);
  //   }
  //};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(propertyData).forEach((key) => {
      formData.append(key, propertyData[key]);
    });

    if (selectedFiles.main_image) {
      data.append("main_image", selectedFiles.main_image);
    }

    // Append selected files if they exist
    selectedFiles.forEach((image, index) => {
      formData.append(`images[${index}]`, image, image.name);
    });

    try {
      const token = sessionStorage.getItem("authToken");

      // Prepare URL-encoded data for most fields
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("description", propertyData.description);
      urlEncodedData.append("address", propertyData.address);
      urlEncodedData.append("location_link", propertyData.location_link);
      urlEncodedData.append("region", propertyData.region);
      urlEncodedData.append("price", propertyData.price);
      urlEncodedData.append("facilities", propertyData.facilities);
      urlEncodedData.append(
        "shared_or_individual",
        propertyData.shared_or_individual
      );
      urlEncodedData.append("governorate", propertyData.governorate);
      urlEncodedData.append("no_of_tenants", propertyData.no_of_tenants);

      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      };

      // Append main image if it exists
      // if (mainImage) {
      //   formData.append("main_image", mainImage, mainImage.name);
      // }

      // Combine URL-encoded data and FormData
      formData.forEach((value, key) => {
        urlEncodedData.append(key, value);
      });

      // Send combined data in request body
      const response = await axios.put(
        `http://localhost:8000/api/accommodations/${id}`,
        urlEncodedData.toString(),
        config
      );

      console.log("Property updated successfully:", response.data);
      navigate("/owner");
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Welcome image={home} />

      <form onSubmit={handleSubmit} className={styles.uploadform}>
        <span className={styles["upload-your-image-text"]}>
          Edit your properties
        </span>

        <span className={styles.specstext}>Apartment Description :</span>
        <input
          onChange={handleChange}
          name="description"
          value={propertyData.description}
          id="description"
          type="text"
          className={styles.appartmentspecsinput}
        />

        <span className={styles.addresstext}> Address :</span>
        <input
          onChange={handleChange}
          name="address"
          value={propertyData.address}
          id="address"
          type="text"
          className={styles.appartmentaddressinput}
        />

        <span className={styles.no_of_tenants}>Number of Tenants :</span>
        <input
          onChange={handleChange}
          name="no_of_tenants"
          value={propertyData.no_of_tenants}
          id="no_of_tenants"
          type="text"
          className={styles.no_of_tenantsinput}
        />

        <span className={styles.main_image}>Main Image :</span>
        <div>
          <input
            className={styles.main_imagee}
            type="file"
            onChange={handleMainImageChange}
          />
          {mainImage && (
            <img
              src={URL.createObjectURL(mainImage)}
              alt="Main Image"
              className={styles["main-image"]}
            />
          )}
        </div>

        <span className={styles.locationtext}>Location Link :</span>
        <input
          onChange={handleChange}
          name="location_link"
          value={propertyData.location_link}
          id="location_link"
          type="text"
          className={styles.locationinput}
        />

        <span className={styles.regiontext}>Region :</span>
        <input
          onChange={handleChange}
          name="region"
          value={propertyData.region}
          id="region"
          type="text"
          className={styles.regioninput}
        />

        <span className={styles.rentaltext}>Rental Price :</span>
        <input
          onChange={handleChange}
          name="price"
          value={propertyData.price}
          id="price"
          type="text"
          className={styles.rentalpriceinput}
        />

        <span className={styles.phonetext}>Facilities :</span>
        <input
          onChange={handleChange}
          name="facilities"
          value={propertyData.facilities}
          id="facilities"
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

        <span className={styles.governoratetext}> Governorate :</span>
        <div>
          <input
            placeholder="select city"
            className={styles.city}
            type="text"
            list="cities"
            name="governorate"
            value={propertyData.governorate}
            onChange={handleChange}
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className={styles.browse}>
          <div className={styles.browseimage}>
            <div>
              <input
                className={styles.text}
                type="file"
                multiple
                onChange={handleFileChange}
              />
              {selectedFiles.length > 0 &&
                selectedFiles.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className={styles.teext}
                  />
                ))}
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

export default OwnersEdit;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import styles from "./upload.module.css";
// import home from "../pictures/up.png";
// import Welcome from "../../componets/welcome/Welcome";

// const OwnersEdit = () => {
//   const { id } = useParams();

//   const cities = ["Alexandria", "Aswan", "Cairo"];

//   const [propertyData, setPropertyData] = useState({
//     description: "",
//     address: "",
//     location_link: "",
//     governorate: "",
//     region: "",
//     price: "",
//     facilities: "",
//     shared_or_individual: "",
//     no_of_tenants: "",
//   });

//   const [mainImage, setMainImage] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   useEffect(() => {
//     fetchPropertyData();
//   }, []);

//   const fetchPropertyData = async () => {
//     try {
//       const token = sessionStorage.getItem("authToken");
//       const response = await axios.get(
//         `http://localhost:8000/api/accommodations/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setPropertyData(response.data);
//     } catch (error) {
//       console.error("Error fetching property data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPropertyData({
//       ...propertyData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles(files);
//   };
//   const handleMainImageChange = (e) => {
//     setMainImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(propertyData).forEach((key) => {
//       formData.append(key, propertyData[key]);
//     });

//     if (selectedFiles.main_image) {
//       data.append("main_image", selectedFiles.main_image);
//     }

//     // Append selected files if they exist
//     selectedFiles.forEach((image, index) => {
//       formData.append(`images[${index}]`, image, image.name);
//     });

//     try {
//       const token = sessionStorage.getItem("authToken");
//       const urlEncodedData = new URLSearchParams();
//       urlEncodedData.append("description", propertyData.description);
//       urlEncodedData.append("address", propertyData.address);
//       urlEncodedData.append("location_link", propertyData.location_link);
//       urlEncodedData.append("region", propertyData.region);
//       urlEncodedData.append("price", propertyData.price);
//       urlEncodedData.append("facilities", propertyData.facilities);
//       urlEncodedData.append(
//         "shared_or_individual",
//         propertyData.shared_or_individual
//       );
//       urlEncodedData.append("governorate", propertyData.governorate);
//       urlEncodedData.append("no_of_tenants", propertyData.no_of_tenants);

//       let config = {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       formData.forEach((value, key) => {
//         urlEncodedData.append(key, value);
//       });

//       // Send combined data in request body
//       const response = await axios.put(
//         `http://localhost:8000/api/accommodations/${id}`,
//         urlEncodedData.toString(),
//         config
//       );

//       console.log("Property updated successfully:", response.data);
//     } catch (error) {
//       console.error("Error updating property:", error);
//     }
//   };

//   return (
//     <>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <Welcome image={home} />

//       <form onSubmit={handleSubmit} className={styles["uploadform"]}>
//         <span className={styles["upload-your-image-text"]}>
//           Edite your properties
//         </span>

//         <span className={styles["specstext"]}>Apartment Description :</span>
//         <input
//           onChange={handleChange}
//           name="description"
//           value={propertyData.description}
//           id="description"
//           type="text"
//           className={styles["appartmentspecsinput"]}
//         />

//         <span className={styles["addresstext"]}> Address :</span>
//         <input
//           onChange={handleChange}
//           name="address"
//           value={propertyData.address}
//           id="address"
//           type="text"
//           className={styles["appartmentaddressinput"]}
//         />

//         <span className={styles["no_of_tenants"]}>Number of Tenants :</span>
//         <input
//           onChange={handleChange}
//           name="no_of_tenants"
//           value={propertyData.no_of_tenants}
//           id="no_of_tenants"
//           type="text"
//           className={styles["no_of_tenantsinput"]}
//         />

//         <span className={styles["main_image"]}>Main Image :</span>
//         <div>
//           <input
//             className={styles["main_imagee"]}
//             type="file"
//             onChange={handleMainImageChange}
//           />
//           {mainImage && (
//             <img
//               src={URL.createObjectURL(mainImage)}
//               alt="Main Image"
//               className={styles["main-image"]}
//             />
//           )}
//         </div>

//         <span className={styles["locationtext"]}>Location Link :</span>
//         <input
//           onChange={handleChange}
//           name="location_link"
//           value={propertyData.location_link}
//           id="location_link"
//           type="text"
//           className={styles["locationinput"]}
//         />

//         <span className={styles["regiontext"]}>Region :</span>
//         <input
//           onChange={handleChange}
//           name="region"
//           value={propertyData.region}
//           id="region"
//           type="text"
//           className={styles["regioninput"]}
//         />

//         <span className={styles["rentaltext"]}>Rental Price :</span>
//         <input
//           onChange={handleChange}
//           name="price"
//           value={propertyData.price}
//           id="price"
//           type="text"
//           className={styles["rentalpriceinput"]}
//         />

//         <span className={styles["phonetext"]}>Facilities :</span>
//         <input
//           onChange={handleChange}
//           name="facilities"
//           value={propertyData.facilities}
//           id="facilities"
//           type="text"
//           className={styles["phonenumberinput"]}
//         />

//         <span className={styles["ortext"]}>
//           Shared Or Individual Apartment?
//         </span>

//         <input
//           onChange={handleChange}
//           value="shared"
//           id="shared"
//           type="radio"
//           name="shared_or_individual"
//           className={styles["sharedradio"]}
//         />
//         <span className={styles["sharedtext"]}>Shared :</span>
//         <input
//           onChange={handleChange}
//           value="individual"
//           id="individual"
//           type="radio"
//           name="shared_or_individual"
//           className={styles["invidualradio"]}
//         />
//         <span className={styles["invidualtext"]}>Individual :</span>

//         <span className={styles["governoratetext"]}> Governorate :</span>
//         <div>
//           <input
//             placeholder="select city"
//             className={styles["city"]}
//             type="text"
//             list="cities"
//             name="governorate" // Updated to match the backend field name
//             value={propertyData.governorate}
//             onChange={handleChange}
//           />
//           <datalist id="cities">
//             {cities.map((city) => (
//               <option key={city} value={city} />
//             ))}
//           </datalist>
//         </div>

//         <div className={styles["browse"]}>
//           <div className={styles["browseimage"]}>
//             <div>
//               <input
//                 className={styles["text"]}
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//               />
//               {selectedFiles.image.length > 0 &&
//                 selectedFiles.map((image, index) => (
//                   <img
//                     key={index}
//                     src={URL.createObjectURL(image)}
//                     alt={`Selected ${index}`}
//                     className={styles["teext"]}
//                   />
//                 ))}
//             </div>
//             <span className={styles["text04"]}>
//               Supports: PNG, JPG, JPEG, WEBP
//             </span>
//           </div>
//         </div>

//         <button type="submit" className={styles["donebutton"]}>
//           <span className={styles["text12"]}>Done</span>
//         </button>
//       </form>
//     </>
//   );
// };

// export default OwnersEdit;
