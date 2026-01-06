


// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Clock,
//   Calendar,
//   Star,
//   ArrowRight,
// } from "lucide-react";
// import Loader from "../components/Loader"; 

// const CourseDetailPage = () => {
//   const { slug } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

 
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [slug]);

//   useEffect(() => {
//     setLoading(true);

//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/courses/${slug}`)
//       .then((res) => {
//         setCourse(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setCourse(null);
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) {
//     return <Loader text="Loading course details..." />;
//   }

//   if (!course) {
//     return (
//       <div className="pt-[150px] min-h-screen flex justify-center items-center">
//         <h2 className="text-2xl font-bold text-red-600">
//           Course not found!
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="pt-[150px] pb-24 px-4 sm:px-6 lg:px-8 min-h-screen
//       bg-gradient-to-b from-white via-purple-50 to-purple-100"
//     >
//       {/* ===== TITLE ===== */}
//       <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-purple-900 mb-6">
//         {course.title}
//       </h1>

//       {/* ===== INTRO ===== */}
//       {course.introduction && (
//         <div className="max-w-4xl mx-auto bg-white/80 shadow-xl rounded-2xl p-6 mb-12">
//           <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
//             {course.introduction}
//           </p>
//         </div>
//       )}

//       {/* ===== INFO CARDS ===== */}
//       <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 mb-14">
//         {course.duration && (
//           <InfoCard icon={<Clock />} label="Duration" value={course.duration} />
//         )}
//         {course.days && (
//           <InfoCard icon={<Calendar />} label="Days" value={course.days} />
//         )}
//         {course.time && (
//           <InfoCard icon={<Clock />} label="Time" value={course.time} />
//         )}
//         {course.startingDate && (
//           <InfoCard
//             icon={<Star />}
//             label="Starting Date"
//             value={course.startingDate}
//           />
//         )}
//       </div>

//       {/* ===== DETAILS ===== */}
//       <div className="max-w-4xl mx-auto space-y-12 text-gray-800">
//         {course.contents?.length > 0 && (
//           <Section title="Course Contents">
//             <ul className="list-disc pl-6 space-y-2">
//               {course.contents.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </Section>
//         )}

//         {course.objectives?.length > 0 && (
//           <Section title="Objectives">
//             <ul className="list-disc pl-6 space-y-2">
//               {course.objectives.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </Section>
//         )}

//         {course.whoCanJoin && (
//           <Section title="Who Can Join">
//             <p>{course.whoCanJoin}</p>
//           </Section>
//         )}

//         {course.feeStructure?.length > 0 && (
//           <Section title="Fee Structure">
//             <ul className="space-y-1">
//               {course.feeStructure.map((fee, i) => (
//                 <li key={i}>• {fee}</li>
//               ))}
//             </ul>
//           </Section>
//         )}

//         {course.medium && (
//           <Section title="Medium">
//             <p>{course.medium}</p>
//           </Section>
//         )}

//         {course.note && (
//           <Section title="Note">
//             <p>{course.note}</p>
//           </Section>
//         )}

//         {course.contact && (
//           <Section title="Contact">
//             <p>{course.contact}</p>
//           </Section>
//         )}

//         {/* ===== CTA ===== */}
//         <div className="text-center pt-8">
//           <Link
//             to={`/enroll/${course.slug}`}
//             className="inline-flex items-center gap-3 px-12 py-4
//               bg-purple-700 text-white text-lg font-bold rounded-xl
//               shadow-lg hover:bg-purple-800 hover:scale-105 transition"
//           >
//             Enroll Now <ArrowRight />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailPage;



// const InfoCard = ({ icon, label, value }) => (
//   <div
//     className="bg-gradient-to-br from-purple-700 to-blue-900
//     text-white p-5 rounded-xl shadow-lg flex items-center gap-4"
//   >
//     <div className="text-amber-300">{icon}</div>
//     <div>
//       <p className="text-sm text-purple-200">{label}</p>
//       <p className="text-lg font-semibold">{value}</p>
//     </div>
//   </div>
// );

// const Section = ({ title, children }) => (
//   <section>
//     <h2 className="text-3xl font-extrabold text-purple-900 mb-3">
//       {title}
//     </h2>
//     <div className="text-lg leading-relaxed">{children}</div>
//   </section>
// );



import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Calendar, Star, ArrowRight } from "lucide-react";
import Loader from "../components/Loader";

const CourseDetailPage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Scroll to top on slug change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  /* Fetch course */
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      setCourse(null);

      // 🔴 Internet check
      if (!navigator.onLine) {
        setError("Internet connection failed. Please check your network.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/courses/${slug}`);
        setCourse(res.data);
      } catch (err) {
        if (err?.response?.status === 404) {
          setError("Course not found.");
        } else {
          setError("Unable to load course details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  /* Loading */
  if (loading) {
    return <Loader text="Loading course details..." />;
  }

  /* Error state */
  if (error) {
    return (
      <div className="pt-[150px] min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            ⚠️ Oops!
          </h2>
          <p className="text-gray-700">{error}</p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              Retry
            </button>

            <Link
              to="/courses"
              className="px-5 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 transition"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Safety (should not happen now, but extra safe) */
  if (!course) return null;

  return (
    <div
      className="pt-[150px] pb-24 px-4 sm:px-6 lg:px-8 min-h-screen
      bg-gradient-to-b from-white via-purple-50 to-purple-100"
    >
      {/* ===== TITLE ===== */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-purple-900 mb-6">
        {course.title}
      </h1>

      {/* ===== INTRO ===== */}
      {course.introduction && (
        <div className="max-w-4xl mx-auto bg-white/80 shadow-xl rounded-2xl p-6 mb-12">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {course.introduction}
          </p>
        </div>
      )}

      {/* ===== INFO CARDS ===== */}
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 mb-14">
        {course.duration && (
          <InfoCard icon={<Clock />} label="Duration" value={course.duration} />
        )}
        {course.days && (
          <InfoCard icon={<Calendar />} label="Days" value={course.days} />
        )}
        {course.time && (
          <InfoCard icon={<Clock />} label="Time" value={course.time} />
        )}
        {course.startingDate && (
          <InfoCard
            icon={<Star />}
            label="Starting Date"
            value={course.startingDate}
          />
        )}
      </div>

      {/* ===== DETAILS ===== */}
      <div className="max-w-4xl mx-auto space-y-12 text-gray-800">
        {course.contents?.length > 0 && (
          <Section title="Course Contents">
            <ul className="list-disc pl-6 space-y-2">
              {course.contents.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {course.objectives?.length > 0 && (
          <Section title="Objectives">
            <ul className="list-disc pl-6 space-y-2">
              {course.objectives.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {course.whoCanJoin && (
          <Section title="Who Can Join">
            <p>{course.whoCanJoin}</p>
          </Section>
        )}

        {course.feeStructure?.length > 0 && (
          <Section title="Fee Structure">
            <ul className="space-y-1">
              {course.feeStructure.map((fee, i) => (
                <li key={i}>• {fee}</li>
              ))}
            </ul>
          </Section>
        )}

        {course.medium && (
          <Section title="Medium">
            <p>{course.medium}</p>
          </Section>
        )}

        {course.note && (
          <Section title="Note">
            <p>{course.note}</p>
          </Section>
        )}

        {course.contact && (
          <Section title="Contact">
            <p>{course.contact}</p>
          </Section>
        )}

        {/* ===== CTA ===== */}
        <div className="text-center pt-8">
          <Link
            to={`/enroll/${course.slug}`}
            className="inline-flex items-center gap-3 px-12 py-4
              bg-purple-700 text-white text-lg font-bold rounded-xl
              shadow-lg hover:bg-purple-800 hover:scale-105 transition"
          >
            Enroll Now <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

/* ================== HELPERS ================== */

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gradient-to-br from-purple-700 to-blue-900 text-white p-5 rounded-xl shadow-lg flex items-center gap-4">
    <div className="text-amber-300">{icon}</div>
    <div>
      <p className="text-sm text-purple-200">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <section>
    <h2 className="text-3xl font-extrabold text-purple-900 mb-3">
      {title}
    </h2>
    <div className="text-lg leading-relaxed">{children}</div>
  </section>
);
