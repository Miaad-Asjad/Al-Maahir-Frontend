


import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Testimonial = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/api/testimonials")
      .then((res) => setList(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-950 to-purple-900 min-h-screen text-white py-16 px-6 sm:px-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
        Student Reflections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {list.map((t, i) => (
          <motion.div
            key={i}
            className="relative bg-white text-gray-800 p-5 w-72 sm:w-80 rounded-lg shadow-xl border-4 border-purple-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-amber-400 rounded-full shadow-md"></div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">{t.text}</p>

            <p className="text-xs text-gray-600 mt-3">
              — {t.name} {t.course && `(${t.course})`}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
