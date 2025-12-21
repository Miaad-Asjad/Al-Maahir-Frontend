
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, PlusCircle } from "lucide-react";

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load courses (defensive)
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/courses"); // ensure axios.baseURL is set (see note)
        console.log("GET /api/courses response:", res);
        const data = res?.data;

        // If backend returned an object for some reason, convert to array
        if (!data) {
          setCourses([]);
        } else if (Array.isArray(data)) {
          setCourses(data);
        } else if (typeof data === "object") {
          // If it's a single course object or error object, try to detect
          // If it looks like a course (has _id or title) put in array
          if (data._id || data.title || data.slug) {
            setCourses([data]);
          } else if (data.data && Array.isArray(data.data)) {
            // sometimes API returns { data: [...] }
            setCourses(data.data);
          } else {
            // otherwise set empty and log so you can inspect
            console.warn("Unexpected /api/courses response shape:", data);
            setCourses([]);
          }
        } else {
          console.warn("Unexpected /api/courses response type:", typeof data, data);
          setCourses([]);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Duplicate/Delete handlers (unchanged)
  const duplicateCourse = async (slug) => {
    if (!window.confirm("Create a duplicate of this course?")) return;
    try {
      const res = await axios.post(`/api/courses/${slug}/duplicate`);
      setCourses((prev) => [res.data, ...prev]);
      alert("Course duplicated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to duplicate course.");
    }
  };

  const deleteCourse = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`/api/courses/${slug}`);
      setCourses((prev) => prev.filter((c) => c.slug !== slug));
      alert("Course deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete course.");
    }
  };

  if (loading) {
    return (
      <div className="pt-[140px] min-h-screen flex justify-center items-center bg-white">
        <h2 className="text-gray-600 text-xl">Loading courses...</h2>
      </div>
    );
  }

  return (
    <div className="pt-[140px] pb-16 px-4 sm:px-6 lg:px-8 min-h-screen 
      bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-center text-amber-300 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Manage Courses
      </motion.h1>

      <div className="text-right max-w-5xl mx-auto mb-6">
        <Link to="/admin/courses/add" className="inline-flex items-center gap-2 bg-amber-300 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-purple-400 transition">
          <PlusCircle size={18} />
          Add New Course
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6">
        {courses.length === 0 ? (
          <p className="text-center text-blue-200">No courses found.</p>
        ) : (
          <table className="w-full text-left text-blue-100">
            <thead>
              <tr className="border-b border-blue-300/30">
                <th className="py-3">Title</th>
                <th className="py-3">Slug</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id || course.slug} className="border-b border-blue-200/20 hover:bg-white/5 transition">
                  <td className="py-3">{course.title}</td>
                  <td className="py-3">{course.slug}</td>
                  <td className="py-3 flex gap-4">
                    <Link to={`/admin/courses/edit/${course.slug}`} className="text-green-400 hover:text-green-300">Edit</Link>
                    <button onClick={() => duplicateCourse(course.slug)} className="text-amber-300 hover:text-amber-200">Duplicate</button>
                    <button onClick={() => deleteCourse(course.slug)} className="text-red-400 hover:text-red-300"><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCoursesPage;
