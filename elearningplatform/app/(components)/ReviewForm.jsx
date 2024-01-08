// elearningplatform\app\components\ReviewForm.jsx
"use client";
import React, { useState } from "react";

const ReviewForm = ({ courseId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ courseId, rating, comment });
    // You can optionally reset the form here
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
        />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={handleCommentChange}></textarea>
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
