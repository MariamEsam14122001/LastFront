import React from "react";

const ImagesList = ({ images }) => {
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`Property image ${index}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default ImagesList;

// const ImagesList = ({ images }) => {
//   return (
//     <>
//       <div
//         id="carouselExampleControlsNoTouching"
//         className="carousel slide"
//         data-bs-touch="false"
//         data-bs-interval="false"
//       >
//         <div className="carousel-inner">
//           {images.map((image, index) => (
//             <img src={image}
//               key={index}
//               className={`carousel-item ${index === 0 ? "active" : ""}`}
//             />

//           ))}
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleControlsNoTouching"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleControlsNoTouching"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </>
//   );
// };

// export default ImagesList;

// import React from "react";

// const ImagesList = ({ images }) => {
//   if (!images) {
//     return <div>Loading images...</div>;
//   }

//   return (
//     <div
//       id="carouselExampleControlsNoTouching"
//       className="carousel slide"
//       data-bs-touch="false"
//       data-bs-interval="false"
//     >
//       <div className="carousel-inner">
//         {images.map((image, index) => (
//           <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
//             <img src={image} className="d-block w-100" alt={`Property image ${index}`} />
//           </div>
//         ))}
//       </div>
//       <button
//         className="carousel-control-prev"
//         type="button"
//         data-bs-target="#carouselExampleControlsNoTouching"
//         data-bs-slide="prev"
//       >
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button
//         className="carousel-control-next"
//         type="button"
//         data-bs-target="#carouselExampleControlsNoTouching"
//         data-bs-slide="next"
//       >
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//   );
// };

// export default ImagesList;
