
// import { motion } from "framer-motion";

// const testimonials = [
//   {
//     text: "الحمد لله اس كورس کے ذریعے کافی غلطیوں کی اصلاح ہوئی تمام قواعد بهي تفصيل سے revise ہو گئے بہت اچھے طریقے سے قرآت کروائ گئی نرمی اور تحمل سے غلطیوں کی اصلاح کی گئی قرآن کے مشکل الفاظ کی مشق کروائی گئی اور بھی بہت کچھ سیکھنے کو ملا اللہ تعالیٰ اساتذه كرام كي محنت كو قبول فرمائیں اور ان کی دینی خدمات میں برکت عطا فرمائیں آمین ان شا اللہ میں کچھ اور سورتوں کے ساتھ بھی یہ کورس کرنا چاہوں گی تاکہ مزید بہتری اور پختگی حاصل ہو جائے",
//     color: "border-blue-500",
//     rotate: "-rotate-6",
//   },
//   {
//     text: "This tajweed course is very effective. I have learned a lot and all teachers are very hard working, supportive, polite. May Allah Ta’ala give them best reward for their efforts and make me sadiqa jarea for them.",
//     color: "border-indigo-700",
//     rotate: "rotate-3",
//   },
//   {
//     text: "تجوید کورس لینے کے بعد بہت سکون قلب ملا ہے۔ بہترین اساتذہ اور بہترین انداز تدریس ہے۔ اللہ تعالیٰ میرے اساتذہ کو جزائے خیر عطا فرمائے۔",
//     color: "border-red-500",
//     rotate: "rotate-6",
//   },
//   {
//     text: "This tajweed course is very effective I have learned a lot and all teachers are very hardworking, supportive, and polite. May Allah reward them immensely.",
//     color: "border-pink-400",
//     rotate: "-rotate-2",
//   },
//   {
//     text: "May Allah ﷻ keep us all in best state of health and Eman .. Aameen Alhamdulillah.. Summa Alhamdulillah... This was one of the best courses in my life. I started knowing only few rules but Maa Sha Allah the way my Teachers let more of the knowledge of Tajweed put into my heart and soul, May Allahﷻ give them higher ranks in hereafter and let them spread this masterpiece of True Knowledge to every heart.",
//     color: "border-blue-500",
//     rotate: "-rotate-6",
//   },
//   {
//     text: "This was my first course with Al Mahir Academy, it was great experience and learning with them specially teachers were very polite and humble.. bcz of my frequent traveling and health issues couldnt attend the classes at the end , but learning word of Allah with the efficient teacher do matters..",
//     color: "border-indigo-700",
//     rotate: "rotate-3",
//   },
// ];

// const Testimonial = () => {
//   return (
//     <div className="bg-gradient-to-b from-blue-950 to-purple-900 min-h-screen text-white py-16 px-6 sm:px-10">
//       <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
//         Student Reflections
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
//         {testimonials.map((t, i) => (
//           <motion.div
//             key={i}
//             className={`relative bg-white text-gray-800 p-5 w-72 sm:w-80 rounded-lg shadow-xl border-4 ${t.color} ${t.rotate}`}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             {/* Pin / Clip Effect */}
//             <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//               <div className="w-4 h-4 bg-pink-500 rounded-full shadow-md"></div>
//             </div>

//             <p className="text-sm sm:text-base leading-relaxed">{t.text}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonial;




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
