// WishList.js

import React, { useEffect } from "react";
import Items from "../../componets/item/Items.jsx";
import Header from "../../componets/header/Header";
import styles from "./wishlist.module.css";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import { WishlistProvider } from "../../Context/WishlistContext.jsx";

function WishList() {
  const { wishlist, fetchLikedItems } = useWishlist();

  useEffect(() => {
    if (fetchLikedItems) {
      fetchLikedItems();
    }
  }, [fetchLikedItems]);

  if (!wishlist) {
    // Handle the case where the wishlist context is not available
    return <div>No wishlist available.</div>; // or render a fallback UI
  }

  return (
    <div>
      <nav className={styles["header"]}>
        <Header />
      </nav>
      <WishlistProvider>
        <Items accommodations={wishlist} />
      </WishlistProvider>
    </div>
  );
}

export default WishList;

// function WishList() {
//   const { wishlist, fetchLikedItems } = useWishlist();

//   useEffect(() => {
//     fetchLikedItems();
//   }, []);

//   return (
//     <div>
//       <nav className={styles["header"]}>
//         <Header />
//       </nav>
//       <Items accommodations={wishlist} />
//     </div>
//   );
// }

// export default WishList;
