import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

 
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError("");

      
      if (!navigator.onLine) {
        setError("Internet connection failed. Please check your network.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data || []);
      } catch (err) {
        setError(
          "Unable to load courses right now. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /* Loading */
  if (loading) {
    return <Loader text="Loading courses..." />;
  }

  /* Error state */
  if (error) {
    return (
      <div className="pt-[120px] min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            ⚠️ Oops!
          </h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
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

      {/* Empty state */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-600">
          No courses available at the moment.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
