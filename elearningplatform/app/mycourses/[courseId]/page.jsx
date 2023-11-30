import getCourseById from "@/app/actions/getCourseById";
import UpdateCourseComponent from "./UpdateCourseComponent";

export default async function page({ params }) {
  const courses = await getCourseById(params);

  return (
    <div>
      <UpdateCourseComponent
        name={courses?.name}
        imageSrc={courses?.imageSrc}
        author={courses?.author}
        price={courses?.price}
        courseId={courses?.id}
        description={courses?.description}
      />
    </div>
  );
}
