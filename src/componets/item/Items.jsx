// AccommodationList.jsx
import React from "react";
import Item from "./Item";
import styles from "./items.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Items = ({ accommodations = [], likedItems = [], onToggleLike }) => {
  if (!Array.isArray(accommodations) || accommodations.length === 0) {
    return <p>Loading....</p>;
  }

  const handleHeartClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault(); // Prevents the default action (navigation)
    onToggleLike(id);
  };

  return (
    <div className={styles["card-container"]}>
      <div className="row row-cols-md-3 g-3">
        {accommodations.map((accommodation) => (
          <Link
            to={`/details/${accommodation.id}`}
            state={{ item: accommodation }}
            key={accommodation.id}
          >
            <div onClick={(e) => e.preventDefault()}>
              <Item
                id={accommodation.id}
                title={accommodation.title}
                price={accommodation.price}
                location={accommodation.location}
                main_image={`http://localhost:8000/storage/${accommodation.main_image}`}
                region={accommodation.region}
                shared_or_individual={accommodation.shared_or_individual}
                isLiked={likedItems.includes(accommodation.id)}
                onToggleLike={(e) => handleHeartClick(e, accommodation.id)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

Items.propTypes = {
  accommodations: PropTypes.array,
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
//           <Link
//             to={`/details/${accommodation.id}`}
//             state={{ item: accommodation }}
//             key={accommodation.id}
//           >
//             <Item
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
