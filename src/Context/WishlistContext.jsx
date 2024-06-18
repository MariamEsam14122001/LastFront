import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Import lodash debounce function

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
      error: null,
    };
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = sessionStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Define fetchLikedItems with debounce
  const fetchLikedItemsDebounced = debounce(async (token) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setWishlist(response.data.wishlist.map((item) => item.accommodation));
        setError(null); // Reset error state on success
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, 500); // 500ms debounce delay

  const addToWishlist = async (itemId, token) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/wishlist/${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setWishlist([...wishlist, response.data.wishlistItem]);
        setError(null); // Reset error state on success
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const removeFromWishlist = async (itemId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/wishlist/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setWishlist(wishlist.filter((item) => item.id !== itemId));
        setError(null); // Reset error state on success
      } else {
        console.error("Failed to remove item from wishlist:", response);
        throw new Error(response.data.message); // Throw error to be caught in handleToggleLike
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      setError(error.message);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        fetchLikedItems: fetchLikedItemsDebounced,
        addToWishlist,
        removeFromWishlist,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const WishlistContext = createContext();

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     console.warn("useWishlist must be used within a WishlistProvider");
//     return {
//       wishlist: [],
//       fetchLikedItems: () => {},
//       addToWishlist: () => {},
//       removeFromWishlist: () => {},
//       error: null,
//     };
//   }
//   return context;
// };

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState(() => {
//     const storedWishlist = sessionStorage.getItem("wishlist");
//     return storedWishlist ? JSON.parse(storedWishlist) : [];
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const fetchLikedItems = async (token) => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/api/wishlist", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         setWishlist(response.data.wishlist.map((item) => item.accommodation));
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addToWishlist = async (itemId, token) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/wishlist/${itemId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setWishlist([...wishlist, response.data.wishlistItem]);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const removeFromWishlist = async (itemId, token) => {
//   try {
//     const response = await axios.delete(
//       `http://localhost:8000/api/wishlist/${itemId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       setWishlist(wishlist.filter((item) => item.id !== itemId));
//     } else {
//       console.error("Failed to remove item from wishlist:", response);
//       throw new Error(response.data.message); // Throw error to be caught in handleToggleLike
//     }
//   } catch (error) {
//     console.error("Error removing item from wishlist:", error);
//     throw error; // Propagate error to handleToggleLike
//   }
// };
//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         fetchLikedItems,
//         addToWishlist,
//         removeFromWishlist,
//         error,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

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
