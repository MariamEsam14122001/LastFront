import React, { useState, useEffect } from "react";
import redHeart from "../pictures/redhearticon.svg";
import emptyHeart from "../pictures/empty_heart.svg";
import { useWishlist } from "../../Context/WishlistContext";
import { useSelector } from "react-redux";

function HeartButton({ accommodationId }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === accommodationId));
  }, [wishlist, accommodationId]);

  const handleToggleLike = async (e) => {
    e.stopPropagation(); // Prevent navigate
    if (!isAuthenticated) {
      console.log("Please log in to add items to wishlist");
      return;
    }

    // Ensure accommodationId is defined before proceeding
    if (!accommodationId) {
      console.error("Accommodation ID is undefined or null.");
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(accommodationId, token);
        setIsInWishlist(false); // Update local state immediately
      } else {
        await addToWishlist(accommodationId, token);
        setIsInWishlist(true); // Update local state immediately
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  // Update isInWishlist when accommodationId or wishlist changes
  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === accommodationId));
  }, [wishlist, accommodationId]);

  return (
    <div>
      {isAuthenticated && (
        <img
          src={isInWishlist ? redHeart : emptyHeart}
          alt={isInWishlist ? "Liked" : "Like"}
          onClick={handleToggleLike}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}

export default HeartButton;
