

import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader"; r

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/courses`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return <Loader text="Loading courses..." />;
  }

  return (
    <div
      className="pt-[120px] sm:pt-[125px] md:pt-[135px] lg:pt-[140px]
      pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white"
    >
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-16">
        Our <span className="text-purple-700">Courses</span>
      </h1>

      {/* Courses Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
