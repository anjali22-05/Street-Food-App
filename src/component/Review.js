import React, { useState } from "react";
import axios from "axios";

const Review = ({ shopid}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      alert("Please give rating and review.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        shopid,
        rating,
        review,
      });

      alert("Review Added Successfully");

      setRating(0);
      setReview("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="review-container">
      <h2>Leave a Review</h2>

      <form onSubmit={handleSubmit}>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hover || rating) ? "star active" : "star"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;