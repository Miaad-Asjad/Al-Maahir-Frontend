
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Testimonial from "../components/Testimonial";
import HomeAboutHighlight from "./HomeAboutHighlight";


const HomePage = () => {
  return (
   <div className="bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white min-h-screen overflow-x-hidden pt-[100px] sm:pt-[120px] md:pt-[140px] lg:pt-[160px]">

      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-purple-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Al-Maahir Academy
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Serving the Ummah with excellence in <span className="text-purple-200 font-semibold">Tajweed, Qiraat, Tarjuma</span> & more — 
          Learn from certified teachers, from the comfort of your home.
        </motion.p>

        {/* Call-to-action buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            to="/courses"
            className="px-6 py-3 bg-purple-200 text-purple-950 font-medium shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center"
          >
            Explore Courses
          </Link>
          <Link
            to="/enroll"
            className="px-6 py-3 bg-transparent border-2 border-purple-200 rounded-lg text-purple-200 font-medium shadow-lg hover:bg-amber-500/10 transition-all duration-300"
          >
            Download Prospectus
          </Link>
        </motion.div>

        {/* Divider Line */}
        {/* Divider Line */}
<motion.div
  className="border-t border-amber-400/30 mt-10 mb-6 w-40 mx-auto"
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ delay: 1.2, duration: 1 }}
/>

      </section>

      {/* Featured Courses Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">

        <motion.h2 
          className="text-center text-3xl sm:text-4xl font-bold mb-16 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our <span className="text-purple-200">Popular</span> Courses
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Tehfeez ul Qur'an", description: "Memorize, Reflect, Transform"},
            { title: "Tajweed ul Qur'an", description: "Preserve the sacred tradition of Quranic Recitation" },
            { title: "Personalized Quran Classes", description: "Transform your relationship with Qur'an today"},
            { title: "Qawaid al-Tajweed", description: "Master the Melody of Revelation" },
          ].map((course, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-b from-blue-900/70 to-purple-900/70 backdrop-blur-md rounded-2xl p-6 text-center border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 h-full flex flex-col"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold text-amber-300 mb-3">{course.title}</h3>
              <p className="text-blue-100 mt-auto">{course.description}</p>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-700 rounded-xl text-white font-medium shadow-lg hover:from-purple-700 hover:to-blue-800 transition-all duration-300 group"
          >
            View All Courses
            <motion.span
              className="ml-2 text-xl group-hover:translate-x-1 transition-transform duration-300"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900/30 to-blue-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-center text-3xl sm:text-4xl font-bold mb-16 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-purple-200">Al-Maahir?</span>
          </motion.h2>
        </div>
       <HomeAboutHighlight />
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 to-blue-950/40">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-center text-3xl sm:text-4xl font-bold mb-16 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Our <span className="text-purple-200">Students</span> Say
          </motion.h2>
         <Testimonial/>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-800 to-purple-800 rounded-3xl p-10 text-center shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Begin Your Quranic Journey Today</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Join hundreds of students who have transformed their relationship with the Quran through our structured courses.</p>
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 bg-purple-300 rounded-xl text-blue-900 font-bold text-lg shadow-lg hover:bg-amber-400 transition-all duration-300"
          >
            Enroll Now
            <motion.span
              className="ml-2 text-xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;