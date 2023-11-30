import myUser from "../actions/getUser";
import getCurrUsersCourse from "../actions/getCurrUsersCourse";
import MyCourseClient from "./MyCourseClient";

export default async function page({ params }) {
  const currentUser = await myUser();

  if (!currentUser) {
    return "Not Authorized for this page";
  }
  const courses = await getCurrUsersCourse();

  if (courses.length === 0) {
    return "No courses found to delete or update";
  }

  return (
    <div className="flex gap-6 px-12 py-8">
      {courses.map((item) => (
        <MyCourseClient data={item} currentUser={currentUser} key={item.id} />
      ))}
    </div>
  );
}
