import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-2xl p-6 text-center border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 h-full flex flex-col shadow-lg"
      whileHover={{ y: -8 }}
    >
      {/* Dynamic Title & Description */}
      <h3 className="text-xl font-semibold text-amber-300 mb-3">
        {course.title}
      </h3>
      <p className="text-gray-200 text-sm flex-1">{course.description}</p>

      {/* Dynamic Link */}
      <Link
        to={`/courses/${course.slug}`}

        className="mt-6 inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg text-white font-medium shadow-md hover:from-purple-700 hover:to-blue-800 transition-all duration-300"
      >
        View Details →
      </Link>
    </motion.div>
  );
};

export default CourseCard;
