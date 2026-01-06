

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const AcademicCalendarPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/api/calendar")
//       .then((res) => setEvents(res.data || []))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">

//       {/* HEADING */}
//       <motion.h1
//         className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 mb-10"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Academic Calendar – 2025
//       </motion.h1>

//       <div className="max-w-5xl mx-auto">

//         {loading ? (
//           <p className="text-center text-gray-600">
//             Loading calendar…
//           </p>
//         ) : events.length === 0 ? (
//           <p className="text-center text-gray-600">
//             No events added yet.
//           </p>
//         ) : (
//           <>
//             {/* ================= MOBILE VIEW (CARDS) ================= */}
//             <div className="space-y-4 md:hidden">
//               {events.map((ev, i) => (
//                 <motion.div
//                   key={ev._id || i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="rounded-xl p-4 bg-gradient-to-b from-blue-950 to-purple-950 text-white shadow-lg"
//                 >
//                   <p className="text-amber-300 font-semibold mb-1">
//                     {ev.date || "—"}
//                   </p>

//                   <h3 className="text-blue-200 font-bold">
//                     {ev.title || "—"}
//                   </h3>

//                   <p className="text-blue-100 text-sm mt-1">
//                     {ev.details || "—"}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

           
//             <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg">
//               <table className="w-full">
//                 <thead className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
//                   <tr>
//                     <th className="py-3 px-4 text-left text-amber-300">
//                       Date
//                     </th>
//                     <th className="py-3 px-4 text-left text-amber-300">
//                       Title
//                     </th>
//                     <th className="py-3 px-4 text-left text-amber-300">
//                       Description
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="bg-gradient-to-b from-blue-950/90 to-purple-950/90 text-white divide-y divide-purple-800">
//                   {events.map((ev, i) => (
//                     <motion.tr
//                       key={ev._id || i}
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: i * 0.04 }}
//                       className="hover:bg-purple-800/40 transition"
//                     >
//                       <td className="py-3 px-4 text-purple-200 whitespace-nowrap">
//                         {ev.date || "—"}
//                       </td>

//                       <td className="py-3 px-4 text-blue-200 font-medium">
//                         {ev.title || "—"}
//                       </td>

//                       <td className="py-3 px-4 text-blue-100">
//                         {ev.details || "—"}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AcademicCalendarPage;


import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AcademicCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH CALENDAR ================= */
  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      setError("");
      setEvents([]);

      // 🔴 Internet check
      if (!navigator.onLine) {
        setError("Internet connection failed. Please check your network.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/calendar");
        setEvents(res.data || []);
      } catch {
        setError(
          "Unable to load academic calendar at the moment. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">

      {/* HEADING */}
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Academic Calendar – 2025
      </motion.h1>

      <div className="max-w-5xl mx-auto">

        {/* ================= LOADING ================= */}
        {loading && (
          <p className="text-center text-gray-600">
            Loading calendar…
          </p>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="text-center max-w-md mx-auto">
            <p className="text-red-600 font-semibold mb-4">
              ⚠️ {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-600">
            No events added yet.
          </p>
        )}

        {/* ================= DATA ================= */}
        {!loading && !error && events.length > 0 && (
          <>
            {/* ========== MOBILE VIEW (CARDS) ========== */}
            <div className="space-y-4 md:hidden">
              {events.map((ev, i) => (
                <motion.div
                  key={ev._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-4 bg-gradient-to-b from-blue-950 to-purple-950 text-white shadow-lg"
                >
                  <p className="text-amber-300 font-semibold mb-1">
                    {ev.date || "—"}
                  </p>

                  <h3 className="text-blue-200 font-bold">
                    {ev.title || "—"}
                  </h3>

                  <p className="text-blue-100 text-sm mt-1">
                    {ev.details || "—"}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ========== DESKTOP VIEW (TABLE) ========== */}
            <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-amber-300">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left text-amber-300">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left text-amber-300">
                      Description
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-gradient-to-b from-blue-950/90 to-purple-950/90 text-white divide-y divide-purple-800">
                  {events.map((ev, i) => (
                    <motion.tr
                      key={ev._id || i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-purple-800/40 transition"
                    >
                      <td className="py-3 px-4 text-purple-200 whitespace-nowrap">
                        {ev.date || "—"}
                      </td>

                      <td className="py-3 px-4 text-blue-200 font-medium">
                        {ev.title || "—"}
                      </td>

                      <td className="py-3 px-4 text-blue-100">
                        {ev.details || "—"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendarPage;
