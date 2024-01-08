// elearningplatform\app\review\ReviewPage.jsx
"use client";
import React from "react";
import ReviewForm from "../(components)/ReviewForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const handleSubmitReview = async (reviewData) => {
    try {
      const response = await axios.post("/api/review", reviewData);
      toast.success("Review submitted successfully");
      router.push(`/course/${courseId}`);
    } catch (error) {
      toast.error("Error submitting review");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="text-center">
      <h2>Write a Review</h2>
      <ReviewForm courseId={courseId} onSubmit={handleSubmitReview} />
      <div>
        Back to <Link href="/">Home</Link>
      </div>
    </div>
  );
};

export default page;
