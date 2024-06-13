// WishlistContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    console.warn("useWishlist must be used within a WishlistProvider");
    return {
      wishlist: [],
      fetchLikedItems: () => {},
      addToWishlist: () => {},
      removeFromWishlist: () => {},
    };
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchLikedItems = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching liked items:", error);
    }
  };

  const addToWishlist = async (itemId, token) => {
    try {
      await axios.post(
        "http://localhost:5000/wishlist/add",
        { id: itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist([...wishlist, itemId]);
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  const removeFromWishlist = async (itemId, token) => {
    try {
      await axios.delete(`http://localhost:5000/wishlist/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(wishlist.filter((item) => item !== itemId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, fetchLikedItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// const WishlistContext = createContext();

// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   const fetchLikedItems = async (token) => {
//     try {
//       const response = await axios.get('http://localhost:5000/wishlist', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setWishlist(response.data);
//     } catch (error) {
//       console.error('Error fetching liked items:', error);
//     }
//   };

//   const addToWishlist = async (itemId, token) => {
//     try {
//       await axios.post(
//         'http://localhost:5000/wishlist/add',
//         { id: itemId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setWishlist([...wishlist, itemId]);
//     } catch (error) {
//       console.error('Error adding item to wishlist:', error);
//     }
//   };

//   const removeFromWishlist = async (itemId, token) => {
//     try {
//       await axios.delete(`http://localhost:5000/wishlist/remove/${itemId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setWishlist(wishlist.filter((item) => item !== itemId));
//     } catch (error) {
//       console.error('Error removing item from wishlist:', error);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, fetchLikedItems, addToWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };
