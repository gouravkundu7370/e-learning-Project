import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Reviewpage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  // Fetch the course and user-specific review data
  useEffect(() => {
    if (status === "authenticated") {
      // Fetch the review data for the course and user
      // You need to replace 'courseId' with the actual course ID
      fetch(`/api/reviews?courseId=${router.query.courseId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setReview({
            rating: data.rating || 0,
            comment: data.comment || "",
          });
        })
        .catch((error) => console.error("Error fetching review:", error));
    }
  }, [status, session, router.query.courseId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit the review data to the server
    const response = await fetch(
      `/api/reviews?courseId=${router.query.courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          rating: review.rating,
          comment: review.comment,
        }),
      }
    );

    if (response.ok) {
      console.log("Review submitted successfully");
      // You can redirect the user or show a success message
    } else {
      console.error("Error submitting review:", await response.json());
      // Handle error, show error message, etc.
    }
    router.push("/course");
  };

  // Render the review form
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Course Review</h1>
      {status === "authenticated" ? (
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-600"
            >
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={review.rating}
              onChange={(e) =>
                setReview({ ...review, rating: parseInt(e.target.value, 10) })
              }
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-600"
            >
              Comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Review
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-600">Please log in to submit a review.</p>
      )}
    </div>
  );
}
