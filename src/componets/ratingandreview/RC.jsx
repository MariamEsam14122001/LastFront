import React, { useState, useEffect } from "react";
import styles from "./rc.module.css"; // Import CSS file for styling
import img8 from "../pictures/user1.png";
import axios from "axios";

function StarRating({ propertyId, userId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() !== "") {
      try {
        const formData = new FormData();
        formData.append("rating", rating);
        formData.append("review", comment);
        formData.append("accommodation_id", propertyId);
        formData.append("user_id", userId);

        await axios.post("http://localhost:8000/api/comments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setComment("");
        setRating(0);
        fetchComments();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/comments?propertyId=${propertyId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [propertyId]);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.starrating}>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                style={{
                  color: value <= rating ? "rgb(9, 192, 248)" : "gray",
                  left: "25px",
                  position: "relative",
                }}
                onClick={() => handleStarClick(value)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <div>
            <label className={styles.Ratin}>Rating:</label>
            <span className={styles.Ratinn}>{rating}</span>
          </div>

          <div>
            <label className={styles.Review}>Review:</label>
            <textarea
              className={styles.text}
              placeholder="Enter your Review..."
              rows="30"
              cols="50"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>

      <div>
        <ul className={styles.img}>
          {comments.map((comment, index) => (
            <img
              key={index}
              src={img8}
              alt="Account"
              className={styles.photo}
            />
          ))}
        </ul>

        <ul className={styles.comment}>
          {comments.map((comment, index) => (
            <li key={index} className={styles.commentt}>
              <p className={styles.p}>{comment.comment}</p>
              <span className={styles.span}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StarRating;

// function StarRating() {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);

//   const handleStarClick = (value) => {
//     setRating(value);
//   };

//   const handleCommentChange = (e) => {
//     setComment(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (comment.trim() !== "") {
//       try {
//         await axios.post("http://localhost:8000/api/comments", {
//           rating,
//           comment,
//         });
//         setComment("");
//         setRating(0);
//         fetchComments();
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//       }
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/comments");
//       setComments(response.data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   return (
//     <div>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.starrating}>
//             {[1, 2, 3, 4, 5].map((value) => (
//               <span
//                 key={value}
//                 style={{
//                   color: value <= rating ? "rgb(9, 192, 248)" : "gray",
//                   left: "25px",
//                   position: "relative",
//                 }}
//                 onClick={() => handleStarClick(value)}
//               >
//                 &#9733;
//               </span>
//             ))}
//           </div>
//           <div>
//             <label className={styles.Ratin}>Rating:</label>
//             <span className={styles.Ratinn}>{rating}</span>
//           </div>

//           <div>
//             <label className={styles.Review}>Review:</label>
//             <textarea
//               className={styles.text}
//               placeholder="Enter your Review..."
//               rows="30"
//               cols="50"
//               value={comment}
//               onChange={handleCommentChange}
//             />
//           </div>

//           <button className={styles.submit} type="submit">
//             Submit
//           </button>
//         </form>
//       </div>

//       <div>
//         <ul className={styles.img}>
//           {comments.map((comment, index) => (
//             <img
//               key={index}
//               src={img8}
//               alt="Account"
//               className={styles.photo}
//             />
//           ))}
//         </ul>

// <ul className={styles.comment}>
//   {comments.map((comment, index) => (
//     <li key={index} className={styles.commentt}>
//       <p className={styles.p}>{comment.comment}</p>
//       <span className={styles.span}>
//         {new Date(comment.createdAt).toLocaleDateString()}
//       </span>
//     </li>
//   ))}
// </ul>
//       </div>
//     </div>
//   );
// }

// export default StarRating;
