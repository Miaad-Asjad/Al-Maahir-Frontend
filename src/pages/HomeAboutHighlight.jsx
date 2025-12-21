import { motion } from "framer-motion";

const HomeAboutHighlight = () => {
  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-md py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-purple-800 mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Why Choose Al-Maahir Academy?
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-center text-base sm:text-lg leading-relaxed text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        At Al-Maahir Academy, we aim to revive love for the Qur'an in every heart, and help every soul connect with Allah ﷻ through proper understanding, pronunciation, and reflection of His divine message.
      </motion.p>

      <ul className="mt-8 max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-gray-700">
        <li><span className="text-purple-800 font-semibold">✓</span> Authentic Knowledge from Qur'an & Sunnah</li>
        <li><span className="text-purple-800 font-semibold">✓</span> Certified Quran Teachers with Proven Expertise</li>
        <li><span className="text-purple-800 font-semibold">✓</span> Quran & Tarbiyah for Women, Children, and Families</li>
        <li><span className="text-purple-800 font-semibold">✓</span> Interactive & Engaging Teaching Style</li>
        <li><span className="text-purple-800 font-semibold">✓</span> Flexible Online Schedules — Learn Anytime, Anywhere</li>
      </ul>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <p className="text-md sm:text-lg font-medium">
          Ready to begin your Qur'anic journey?
        </p>
        <p className="text-purple-700 font-semibold mt-1">
          Enroll today — and become one of the People of the Qur’an.
        </p>
      </motion.div>
    </div>
  );
};

export default HomeAboutHighlight;
