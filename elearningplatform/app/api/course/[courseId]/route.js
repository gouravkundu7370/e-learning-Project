import myUser from "@/app/actions/getUser";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { courseId } = params;

  if (!courseId || typeof courseId !== "string") {
    throw new Error("Invalid Id");
  }

  const course = await prisma.course.deleteMany({
    where: {
      id: courseId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(course);
}

export async function PUT(request, { params }) {
  const { courseId } = params;
  const json = await request.json();
  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!courseId || typeof courseId !== "string") {
    throw new Error("Invalid Id");
  }

  const updated = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: json,
  });

  return NextResponse.json(updated);
}
