

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const AboutUsPage = () => {
  const [loading, setLoading] = useState(true);

  // 🔹 Loader control
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // smooth professional delay

    return () => clearTimeout(timer);
  }, []);

  // 🔹 Loader render
  if (loading) {
    return <Loader text="Loading About Us..." />;
  }

  return (
    <div className="bg-gradient-to-b from-white to-purple-100 min-h-screen px-4 sm:px-6 lg:px-8 pt-32 lg:pt-36 xl:pt-40 pb-16 text-gray-800">

      {/* Bismillah Title */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-primary mb-4 tracking-wide leading-snug"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ
      </motion.h1>

      {/* Welcome Subheading */}
      <motion.h2
        className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-center text-purple-800 mb-6 leading-snug sm:leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        مرحبا یاأھل القرآن — Welcome! The People of the Qur'an
      </motion.h2>

      {/* About Paragraph */}
      <motion.p
        className="max-w-3xl mx-auto text-center text-sm sm:text-base md:text-lg leading-loose text-gray-700 px-1 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Welcome! The people of the Quran, the people of Allah and His chosen ones.
        We are here to serve the Muslim Ummah through our platform for those who
        want to learn the Qur'an and its related subjects, i.e. Naazra, Tajweed,
        Tehfeez, Tarjuma, Fehm, Grammar, Seerah, and children's Tarbiyyah Courses.
        <br /><br />
        We are dedicated to giving our very best, through qualified, well-trained teachers,
        for you and your children. We offer individual classes, group courses, live lectures and so much more.
        <br /><br />
        We invite you to join our specialized online courses in Tajweed, the art of reciting the Holy Quran with
        perfect pronunciation and articulation, as taught by our beloved Prophet Muhammad (ﷺ).
      </motion.p>

      {/* Course Features Section */}
      <motion.div
        className="mt-14 max-w-4xl mx-auto px-2 sm:px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-primary mb-6">
          Course Features
        </h3>
        <ul className="space-y-5 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          <li>
            <span className="font-semibold text-purple-800">Qualified Instructors:</span>{" "}
            Learn from experienced teachers who are experts in Tajweed and deeply knowledgeable in the sciences of the Quran.
          </li>
          <li>
            <span className="font-semibold text-purple-800">Comprehensive Curriculum:</span>{" "}
            Our curriculum encompasses all aspects of Tajweed, from basic rules to advanced techniques.
          </li>
          <li>
            <span className="font-semibold text-purple-800">Flexible Online Classes:</span>{" "}
            Learn from the comfort of your home with flexible timings.
          </li>
          <li>
            <span className="font-semibold text-purple-800">Individual Attention:</span>{" "}
            Small class sizes ensure personalized guidance and support.
          </li>
        </ul>
      </motion.div>

      {/* Decorative Bottom Line */}
      <motion.div
        className="mt-16 w-24 h-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      />
    </div>
  );
};

export default AboutUsPage;
