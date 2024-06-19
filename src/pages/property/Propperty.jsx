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
import Footer from "../../componets/footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import bathroom from "./bathroom3.jpg";
// import bedroom from "./bedroomred.jpg";
// import living from "./living5.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const PropertyDetails = (props) => {
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, wishlist, error } = useWishlist();
  const [item, setItem] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [VRimagesArray, setVRImagesArray] = useState([]);
  const [showPanorama, setShowPanorama] = useState(false);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const userId = userProfile ? userProfile.id : null;
  const [roommateData, setRoommateData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch accommodation details
        const response = await axios.get(
          `http://localhost:8000/api/accommodation/${id}`
        );
        console.log("Accommodation API Response:", response.data);
        setItem(response.data);

        // Set images array
        const fetchedImages = Array.isArray(response.data.accommodation.images)
          ? response.data.accommodation.images
          : response.data.accommodation.images.split(",");
        setImagesArray(fetchedImages);

        // Fetch rental data based on accommodation ID
        const rentalsResponse = await axios.get(
          `http://localhost:8000/api/rental_accommodation_id/${id}`
        );
        const rentedInfo = rentalsResponse.data;
        console.log("Rental API Response:", rentedInfo);

        // Check if rentedInfo is an object and has keys
        if (
          typeof rentedInfo === "object" &&
          Object.keys(rentedInfo).length > 0
        ) {
          // Convert rentedInfo object into an array of rentals
          const rentals = Object.values(rentedInfo);

          // Find the rental that matches the accommodation ID
          const rentedAccommodation = rentals.find(
            (rental) => rental.accommodations_id == id
          );
          if (rentedAccommodation) {
            const roommateUserId = rentedAccommodation.user_id;
            console.log("Roommate User ID:", roommateUserId);

            // Fetch roommate data based on user ID
            const userResponse = await axios.get(
              `http://localhost:8000/api/rental/user/${roommateUserId}`
            );
            console.log("Roommate API Response:", userResponse.data);
            setRoommateData(userResponse.data);
          } else {
            console.log("No rented accommodation found for this property.");
          }
        } else {
          console.log("No rentals found for this property.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const togglePanorama = () => {
    const vrImages = item.accommodation.images || [];

    if (vrImages.length > 0) {
      setVRImagesArray(vrImages);
      setShowPanorama(!showPanorama);
    } else {
      console.log("No panoramic images available");
    }
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

  return (
    <>
      <Header />

      <div className={styles["property-details"]}>
        <div className={styles["image1"]}>
          {showPanorama ? (
            <div className={styles["panorama-image"]}>
              {VRimagesArray.length > 0 ? (
                <VRList images={VRimagesArray} />
              ) : (
                <div>No panoramic images available</div>
              )}
            </div>
          ) : (
            <ImagesList images={imagesArray} />
          )}
        </div>
        <button onClick={togglePanorama} className={styles["vrbutton"]}>
          Property's Virtual Reality
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
        <div className={styles["rectangle12"]} />

        <div className={styles["rentbutton"]}>
          <RentButton accommodationId={id} />

          <div className={styles["heart"]}>
            <WishlistProvider>
              <HeartButton
                accommodationId={id}
                isWishlist={wishlist.includes(accommodation.id)}
                onToggleWishlist={() => handleToggleWishlist(accommodation.id)}
              />
            </WishlistProvider>
          </div>
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
            left: "10px",
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
        {/* Ensure roommateData is not null before accessing its properties */}
        {roommateData ? (
          <Link to={`/roommate/${roommateData.id}`}>
            <img
              src={img7}
              alt="Roommate"
              className={styles["providerphoto"]}
            />
          </Link>
        ) : (
          <div>Loading roommate data...</div>
        )}
        <span className={styles["text22"]}>
          {roommateData ? (
            <span>{roommateData.name}</span>
          ) : (
            <span>Loading roommate data...</span>
          )}
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
      <StarRating propertyId={id} userId={userId} />
      <div className={styles["foot"]}>
        <Footer />
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
