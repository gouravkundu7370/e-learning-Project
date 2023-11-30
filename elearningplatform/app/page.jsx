import CourseComponent from "./(components)/CourseComponent";
import SliderMain from "./(components)/SliderMain";
import getAllCourses from "./actions/getAllCourses";

const images = ["/a.jpg", "b.jpg"];

export default async function Home({ searchParams }) {
  const courses = await getAllCourses(searchParams);

  return (
    <main className="w-[100%]">
      <SliderMain images={images} />

      <div>
        <div className="flex flex-wrap px-8">
          {courses.map((item) => (
            <CourseComponent key={item.id} data={item} currentUser={null} />
          ))}
        </div>
      </div>
    </main>
  );
}
