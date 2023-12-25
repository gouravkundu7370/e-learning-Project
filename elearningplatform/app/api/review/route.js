import prisma from "../../lib/prismadb";
import myUser from "@/app/actions/getUser";
import { NextResponse } from "next/server";
export async function POST(request) {
  const currentUser = await myUser();
  if (!currentUser) {
    return console.log("No permission, no user registered");
  }
  const body = await request.json();
  const { courseId, rating, comment } = body;
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
    include: { reviews: true },
  });
  if (!existingCourse) {
    return NextResponse.notFound("Course not found");
  }
  const existingReview = existingCourse.reviews.find(
    (review) => review.userId === currentUser.id
  );

  if (existingReview) {
    return NextResponse.conflict(
      "You have already submitted a review for this course"
    );
  }
  const review = await prisma.review.create({
    data: {
      courseId,
      userId: currentUser.id,
      rating,
      comment,
    },
  });
  return NextResponse.json(review);
}
