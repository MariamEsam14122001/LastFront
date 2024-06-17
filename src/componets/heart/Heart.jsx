import React from "react";
import red from "../pictures/redhearticon.svg";
import empty from "../pictures/empty_heart.svg";
import { useWishlist } from "../../Context/WishlistContext";

import { useSelector } from "react-redux";

function HeartButton({ id }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  if (!wishlist || !addToWishlist || !removeFromWishlist) {
    // Handle the case where the wishlist context is not available
    return null; // or render a fallback UI
  }

  const handleToggleLike = () => {
    e.stopPropagation(); // prevent navigate
    if (!isAuthenticated) {
      console.log("Please log in to add items to wishlist");
      return;
    }

    if (wishlist.includes(id)) {
      removeFromWishlist(id, token);
    } else {
      addToWishlist(id, token);
    }
  };

  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {isAuthenticated && (
        <img
          src={wishlist.includes(id) ? red : empty}
          alt={wishlist.includes(id) ? "Liked" : "Like"}
          onClick={handleToggleLike}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}

export default HeartButton;
