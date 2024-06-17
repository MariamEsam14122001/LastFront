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
  const governates = ["Alexandria", "Cairo", "Aswan"];
  const regionsByGovernates = {
    Alexandria: ["Seyouf", "San Stefano", "Louran", "Sidi Bishr"],
    Cairo: ["Maadi", "Heliopolis", "Nasr City", "6th of October"],
    Aswan: ["Daraw", "Edfu", "Abu Simbel"],
  };
  const [regions, setRegions] = useState([]);

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
    if (name === "governorate") {
      setRegions(regionsByGovernates[value] || []);
      setPropertyData({ ...propertyData, region: "", [name]: value });
    }
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
          placeholder="Enter yoor description"
          id="description"
          type="text"
          className={styles.appartmentspecsinput}
        />

        <span className={styles.addresstext}> Address :</span>
        <input
          onChange={handleChange}
          name="address"
          value={propertyData.address}
          placeholder="Enter your address"
          id="address"
          type="text"
          className={styles.appartmentaddressinput}
        />

        <span className={styles.no_of_tenants}>Number of Tenants :</span>
        <input
          onChange={handleChange}
          name="no_of_tenants"
          value={propertyData.no_of_tenants}
          placeholder="Enter your number of tenants"
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
          placeholder="Enter your location link"
          id="location_link"
          type="text"
          className={styles.locationinput}
        />

        <span className={styles.regiontext}>Region :</span>
        <select
          name="region"
          value={propertyData.region}
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
          value={propertyData.price}
          placeholder="Enter your rental price"
          id="price"
          type="text"
          className={styles.rentalpriceinput}
        />

        <span className={styles.phonetext}>Facilities :</span>
        <input
          onChange={handleChange}
          name="facilities"
          value={propertyData.facilities}
          placeholder="Enter your facilities"
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
          <select
            name="governorate"
            value={propertyData.governorate}
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

// import React, { useState /*useEffect */ } from "react";
// import axios from "axios";
// import { /* useParams,*/ useNavigate } from "react-router-dom";

// //import styles from "./upload.module.css";
// import styles from "./upload.module.css";
// import home from "../pictures/up.png";
// import Welcome from "../../componets/welcome/Welcome";

// const OwnersEdit = () => {
//   //const { id } = useParams();
//   const navigate = useNavigate();
//   const governates = ["Alexandria", "Cairo", "Aswan"];
//   const regionsByGovernates = {
//     Alexandria: ["Seyouf", "San Stefano", "Louran", "Sidi Bishr"],
//     Cairo: ["Maadi", "Heliopolis", "Nasr City", "6th of October"],
//     Aswan: ["Daraw", "Edfu", "Abu Simbel"],
//   };
//   const [regions, setRegions] = useState([]);
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

//   const [selectedFiles, setSelectedFiles] = useState({
//     images: [],
//     main_image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPropertyData({
//       ...propertyData,
//       [name]: value,
//     });

//     if (name === "governorate") {
//       setRegions(regionsByGovernates[value] || []);
//       setPropertyData({ ...propertyData, region: "", [name]: value });
//     }
//   };
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "images") {
//       setSelectedFiles({ ...selectedFiles, images: Array.from(files) });
//     } else {
//       setSelectedFiles({ ...selectedFiles, [name]: files[0] });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(propertyData).forEach((key) => {
//       data.append(key, propertyData[key]);
//     });

//     selectedFiles.images.forEach((file, index) => {
//       data.append(`images[${index}]`, file);
//     });

//     if (selectedFiles.main_image) {
//       data.append("main_image", selectedFiles.main_image);
//     }

//     // Log FormData contents for debugging
//     for (let pair of data.entries()) {
//       console.log(`${pair[0]}: ${pair[1]}`);
//     }

//     const token = sessionStorage.getItem("authToken");

//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/accommodationform",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Upload successful:", response.data);
//       navigate("/owner");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       if (error.response) {
//         console.error("Server responded with:", error.response.data);
//       }
//     }
//   };
//   return (
//     <>
//       <meta charSet="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <Welcome image={home} />

//       <form onSubmit={handleSubmit} className={styles.uploadform}>
//         <span className={styles["upload-your-image-text"]}>
//           Edit your properties
//         </span>

//         <span className={styles.specstext}>Apartment Description :</span>
//         <input
//           onChange={handleChange}
//           name="description"
//           value={propertyData.description}
//           id="description"
//           type="text"
//           placeholder="Enter yoor description"
//           className={styles.appartmentspecsinput}
//         />

//         <span className={styles.addresstext}> Address :</span>
//         <input
//           onChange={handleChange}
//           name="address"
//           value={propertyData.address}
//           id="address"
//           placeholder="Enter your address"
//           type="text"
//           className={styles.appartmentaddressinput}
//         />

//         <span className={styles.no_of_tenants}>Number of Tenants :</span>
//         <input
//           onChange={handleChange}
//           name="no_of_tenants"
//           value={propertyData.no_of_tenants}
//           id="no_of_tenants"
//           type="text"
//           placeholder="Enter your number of tenants"
//           className={styles.no_of_tenantsinput}
//         />

//         <span className={styles.main_image}>Main Image :</span>
//         <div>
//           <input
//             className={styles.main_imagee}
//             type="file"
//             name="main_image"
//             onChange={handleFileChange}
//           />
//           {selectedFiles.main_image && (
//             <p className={styles.main_ima}>{selectedFiles.main_image.name}</p>
//           )}
//         </div>

//         <span className={styles.locationtext}>Location Link :</span>
//         <input
//           onChange={handleChange}
//           name="location_link"
//           value={propertyData.location_link}
//           id="location_link"
//           type="text"
//           placeholder="Enter your location link"
//           className={styles.locationinput}
//         />

//         <span className={styles.regiontext}>Region :</span>
//         <select
//           name="region"
//           value={propertyData.region}
//           onChange={handleChange}
//           className={styles.regioninput}
//         >
//           <option value="" className={styles.select}>
//             Select Region
//           </option>
//           {regions.map((region) => (
//             <option key={region} value={region}>
//               {region}
//             </option>
//           ))}
//         </select>
//         <span className={styles.rentaltext}>Rental Price :</span>
//         <input
//           onChange={handleChange}
//           name="price"
//           value={propertyData.price}
//           id="price"
//           placeholder="Enter your rental price"
//           type="text"
//           className={styles.rentalpriceinput}
//         />

//         <span className={styles.phonetext}>Facilities :</span>
//         <input
//           onChange={handleChange}
//           name="facilities"
//           value={propertyData.facilities}
//           id="facilities"
//           type="text"
//           placeholder="Enter your facilities"
//           className={styles.phonenumberinput}
//         />

//         <span className={styles.ortext}>Shared Or Individual Apartment?</span>

//         <input
//           onChange={handleChange}
//           value="shared"
//           id="shared"
//           type="radio"
//           name="shared_or_individual"
//           className={styles.sharedradio}
//         />
//         <span className={styles.sharedtext}>Shared :</span>
//         <input
//           onChange={handleChange}
//           value="individual"
//           id="individual"
//           type="radio"
//           name="shared_or_individual"
//           className={styles.invidualradio}
//         />
//         <span className={styles.invidualtext}>Individual :</span>

//         <span className={styles.governoratetext}> city :</span>
//         <div>
//           <select
//             name="governorate"
//             value={propertyData.governorate}
//             onChange={handleChange}
//             className={styles.city}
//           >
//             <option value="">Select Governorate</option>
//             {governates.map((governorate) => (
//               <option key={governorate} value={governorate}>
//                 {governorate}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className={styles.browse}>
//           <div className={styles.browseimage}>
//             <div>
//               <input
//                 className={styles.text}
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//               />
//               {selectedFiles.length > 0 &&
//                 selectedFiles.map((image, index) => (
//                   <img
//                     key={index}
//                     src={URL.createObjectURL(image)}
//                     alt={`Selected ${index}`}
//                     className={styles.teext}
//                   />
//                 ))}
//             </div>
//             <span className={styles.text04}>
//               Supports: PNG, JPG, JPEG, WEBP
//             </span>
//           </div>
//         </div>

//         <button type="submit" className={styles.donebutton}>
//           <span className={styles.text12}>Done</span>
//         </button>
//       </form>
//     </>
//   );
// };

// export default OwnersEdit;
