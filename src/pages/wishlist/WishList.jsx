// WishList.js

import React, { useEffect } from "react";
import Items from "../../componets/item/Items.jsx";
import Header from "../../componets/header/Header";
import styles from "./wishlist.module.css";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import { WishlistProvider } from "../../Context/WishlistContext.jsx";
import { useSelector } from "react-redux";

function WishList() {
  const { wishlist, fetchLikedItems } = useWishlist();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (fetchLikedItems && token) {
      fetchLikedItems(token);
    }
  }, [fetchLikedItems, token]);

  if (!wishlist) {
    return <div>No wishlist available.</div>;
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
