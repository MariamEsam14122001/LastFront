import React, { useState, useEffect } from "react";
import styles from "./property.module.css";
import img6 from "../pictures/location.png";
import img7 from "../pictures/provide.png";
import HeartButton from "../../componets/heart/Heart.jsx";
import {
  WishlistProvider,
  useWishlist,
} from "../../Context/WishlistContext.jsx";
import VRList from "../../componets/vr/VRList.jsx";
import ImagesList from "../../componets/vr/ImagesList.jsx";
import img1 from "../pictures/line.png";
import Header from "../../componets/header/Header.jsx";
import RentButton from "../../componets/rentbutton/Rent.jsx";
import StarRating from "../../componets/ratingandreview/RC.jsx";
import { useParams } from "react-router-dom";
// import bathroom from "./bathroom3.jpg";
// import bedroom from "./bedroomred.jpg";
// import living from "./living5.jpg";
import axios from "axios";

const PropertyDetails = (props) => {
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, wishlist, error } = useWishlist();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/accommodation/${id}`
        );
        console.log("API Response:", response.data);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching the property details:", error);
      }
    };

    fetchData();
  }, [id]);

  const [showPanorama, setShowPanorama] = useState(false);
  const togglePanorama = () => {
    setShowPanorama(!showPanorama);
  };
  const handleToggleWishlist = (accommodationId) => {
    if (wishlist.includes(accommodationId)) {
      removeFromWishlist(accommodationId);
    } else {
      addToWishlist(accommodationId);
    }
  };
  if (error) {
    return <div>Error loading property details: {error.message}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  const accommodation = item.accommodation;
  const imagesArray = Array.isArray(accommodation.images)
    ? accommodation.images
    : accommodation.images.split(",");

  return (
    <>
      <Header />
      <RentButton accommodationId={id} />
      <StarRating />
      <div className={styles["property-details"]}>
        <div className={styles["image1"]}>
          {showPanorama ? (
            <div className={styles["panorama-image"]}>
              <VRList images={imagesArray} />
            </div>
          ) : (
            <ImagesList images={imagesArray} />
          )}
        </div>
        <button onClick={togglePanorama} className={styles["vrbutton"]}>
          Property&apos;s Virtual Reality
        </button>
        <span className={styles["d3"]}>
          <span>Governorate: {accommodation.governorate}</span>
        </span>
        <span className={styles["d4"]}>
          <span>Available: {accommodation.availability}</span>
        </span>
        <span className={styles["d5"]}>
          <span>Region: {accommodation.region}</span>
        </span>
        <span className={styles["d6"]}>
          <span>Address: {accommodation.address}</span>
        </span>
        <div className={styles["rentdetails"]} />
        <span className={styles["r1"]}>
          <span>{accommodation.price} EGP/Monthly</span>
        </span>
        <div className={styles["line2"]} />
        <div className={styles["r2"]} />
        <span className={styles["r3"]}>
          <span>Save to Wishlist</span>
        </span>
        <div className={styles["rectangle12"]}>
          <WishlistProvider>
            <HeartButton
              accommodationId={id}
              isWishlist={wishlist.includes(accommodation.id)}
              onToggleWishlist={() => handleToggleWishlist(accommodation.id)}
            />
          </WishlistProvider>
        </div>

        <img src={img1} alt="gege" className={styles["line"]} />

        <span className={styles["description"]}>
          <span>Description</span>
        </span>
        <div
          style={{
            color: "black",
            top: "1150px",
            fontSize: "large",
            fontWeight: "600",
            position: "absolute",
            left: "150px",
          }}
        >
          <p>{accommodation.description}</p>
          <p>{accommodation.facilities}</p>
          <p>{accommodation.shared_or_individual}</p>
        </div>
        <span className={styles["location"]}>
          <span>Location:</span>
        </span>
        <img src={img6} alt={props} className={styles["locationphoto"]} />
        <span className={styles["text15"]}>
          <span>{accommodation.location_link}</span>
        </span>
        <span className={styles["provider"]}>
          <span>Roommate:</span>
        </span>
        <img src={img7} alt={props} className={styles["providerphoto"]} />
        <span className={styles["text22"]}>
          <span>
            <span>yasmin mohamed</span>
            <br />
          </span>
        </span>

        <img src={img1} alt="gege" className={styles["lineee"]} />

        <div
          style={{
            left: "125px",
            position: "absolute",
            width: "50%",
            top: "100px",
          }}
        ></div>
      </div>
    </>
  );
};

export default PropertyDetails;

// const PropertyDetails = (props) => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [error, setError] = useState(null);
//   const imagesArray = [bedroom, bathroom, living];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/accommodation/${id}`
//         );
//         console.log("API Response:", response.data);
//         setItem(response.data);
//       } catch (error) {
//         console.error("Error fetching the property details:", error);
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Panorama show
//   const [showPanorama, setShowPanorama] = useState(false);
//   const togglePanorama = () => {
//     setShowPanorama(!showPanorama);
//   };

//   if (error) {
//     return <div>Error loading property details: {error.message}</div>;
//   }

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   const accommodation = item.accommodation;
//   // const imagesArray = Array.isArray(accommodation.images)
//   //   ? accommodation.images
//   //   : accommodation.images.split(",");

//   // // Construct the full image URLs
//   // const fullImageUrls = imagesArray.map(
//   //   (image) => `http://localhost:8000/storage/${id}/${image}`
//   // );

//   return (
//     <>
//       <Header />
//       <WhatsAppButton />
//       <StarRating />
//       <div className={styles["property-details"]}>
//         <div className={styles["image1"]}>
//           {showPanorama ? (
//             <div className={styles["panorama-image"]}>
//               <VRList images={imagesArray} />
//             </div>
//           ) : (
//             <ImagesList images={imagesArray} />
//           )}
//         </div>
//         <button onClick={togglePanorama} className={styles["vrbutton"]} />
//         <span className={styles["textbuttonvr"]}>
//           <span>Property&apos;s Virtual Reality</span>
//         </span>

//         <span className={styles["d3"]}>
//           <span>Governorate:{accommodation.governorate}</span>
//         </span>
//         <span className={styles["d4"]}>
//           <span>Available: {accommodation.availability}</span>
//         </span>
//         <span className={styles["d5"]}>
//           <span>Region: {accommodation.region}</span>
//         </span>
//         <span className={styles["d6"]}>
//           <span>Address: {accommodation.address}</span>
//         </span>

//         <div className={styles["rentdetails"]} />
//         <span className={styles["r1"]}>
//           <span>{accommodation.price} EGP/Monthly</span>
//         </span>

//         <div className={styles["line2"]} />
//         <div className={styles["r2"]} />

//         <span className={styles["r3"]}>
//           <span>Save to Wishlist</span>
//         </span>

//         <div className={styles["rectangle12"]}>
//           <HeartButton id={accommodation.id} />
//         </div>

//         <img src={img1} alt="gege" className={styles["line"]} />

//         <span className={styles["description"]}>
//           <span>Description</span>
//         </span>
//         <div
//           style={{
//             color: "black",
//             top: "1150px",
//             position: "absolute",
//             left: "150px",
//           }}
//         >
//           <p>{accommodation.description}</p>
//           <p>{accommodation.facilities}</p>
//           <p>{accommodation.shared_or_individual}</p>
//         </div>

//         <span className={styles["location"]}>
//           <span>Location:</span>
//         </span>
//         <img src={img6} alt={props} className={styles["locationphoto"]} />
//         <span className={styles["text15"]}>
//           <span>{accommodation.location_link}</span>
//         </span>
//         <span className={styles["provider"]}>
//           <span>Roommate:</span>
//         </span>
//         <img src={img7} alt={props} className={styles["providerphoto"]} />
//         <span className={styles["text22"]}>
//           <span>
//             <span>yasmin mohamed</span>
//             <br />
//           </span>
//         </span>

//         <img src={img1} alt="gege" className={styles["lineee"]} />

//         <div
//           style={{
//             left: "125px",
//             position: "absolute",
//             width: "50%",
//             top: "100px",
//           }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default PropertyDetails;
