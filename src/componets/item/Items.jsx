// AccommodationList.jsx
import React from "react";
import Item from "./Item";
import styles from "./items.module.css";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";

const Items = ({ accommodations = [], likedItems = [], onToggleLike }) => {
  if (!Array.isArray(accommodations) || accommodations.length === 0) {
    return <p>No accommodations found.</p>;
  }

  return (
    <div className={styles["card-container"]}>
      <div className="row row-cols-md-4 g-4">
        {accommodations.map((accommodation) => (
          <Item
            key={accommodation.id}
            id={accommodation.id}
            title={accommodation.title}
            price={accommodation.price}
            location={accommodation.location}
            main_image={`http://localhost:8000/storage/${accommodation.main_image}`}
            region={accommodation.region}
            shared_or_individual={accommodation.shared_or_individual}
            isLiked={likedItems.includes(accommodation.id)}
            onToggleLike={() => onToggleLike(accommodation.id)}
          />
        ))}
      </div>
    </div>
  );
};

Items.propTypes = {
  accommodations: PropTypes.array.isRequired,
  likedItems: PropTypes.array,
  onToggleLike: PropTypes.func,
};

export default Items;

// const Items = ({ accommodations = [], likedItems = [], onToggleLike }) => {
//   if (!Array.isArray(accommodations) || accommodations.length === 0) {
//     return <p>Loading....</p>;
//   }

//   return (
//     <div className={styles["card-container"]}>
//       <div className="row  row-cols-md-3 g-3">
//         {accommodations.map((accommodation) => (
//  <Link
//   to={`/details/${accommodation.id}`}
//   state={{ item: accommodation }}
//   key={accommodation.id}
// >
// //             <Item
//               id={accommodation.id}
//               title={accommodation.title}
//               price={accommodation.price}
//               location={accommodation.location}
//               main_image={`http://localhost:8000/storage/${accommodation.main_image}`}
//               region={accommodation.region}
//               shared_or_individual={accommodation.shared_or_individual}
//               isLiked={likedItems.includes(accommodation.id)}
//               onToggleLike={() => onToggleLike(accommodation.id)}
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// Items.propTypes = {
//   accommodations: PropTypes.array,
//   likedItems: PropTypes.array,
//   onToggleLike: PropTypes.func,
// };

// export default Items;
