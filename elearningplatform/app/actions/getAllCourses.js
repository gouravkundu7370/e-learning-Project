import prisma from "../lib/prismadb";

export default async function getAllCourses(params) {
  try {
    const { result } = params;

    let query = {};

    if (result) {
      query.name = {
        contains: result,
      };
    }

    const courses = await prisma.course.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeCourse = courses.map((course) => ({
      ...course,
      createdAt: course.createdAt.toISOString(),
    }));

    return safeCourse;
  } catch (error) {
    throw new Error(error);
  }
}
