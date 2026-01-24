// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FileText, FileVideo, FileAudio, Folder } from "lucide-react";

// const BACKEND_URL = "https://al-maahir-backend-production.up.railway.app";

// const ResourcesPage = () => {
//   const [resources, setResources] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchResources = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await axios.get("/api/resources");
//         setResources(res.data || []);
//       } catch {
//         setError("Unable to load resources. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResources();
//   }, []);

//   const filtered =
//     filter === "all"
//       ? resources
//       : resources.filter((r) => r.type === filter);

//   const typeIcon = (t) => {
//     switch (t) {
//       case "pdf":
//         return <FileText size={28} className="text-red-400" />;
//       case "audio":
//         return <FileAudio size={28} className="text-blue-400" />;
//       case "video":
//         return <FileVideo size={28} className="text-purple-400" />;
//       case "note":
//         return <Folder size={28} className="text-green-400" />;
//       default:
//         return <Folder size={28} className="text-gray-400" />;
//     }
//   };

//   return (
//     <div className="pt-[150px] pb-24 bg-gradient-to-b from-blue-950 to-purple-900 min-h-screen text-white px-4">
//       {/* Title */}
//       <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-14 text-amber-300 tracking-wide">
//         Learning Resources
//       </h1>

//       {/* Loading */}
//       {loading && (
//         <p className="text-center text-blue-200">Loading resources…</p>
//       )}

//       {/* Error */}
//       {!loading && error && (
//         <div className="text-center max-w-md mx-auto">
//           <p className="text-red-400 font-semibold mb-4">⚠️ {error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-amber-300 text-blue-900 rounded-xl font-semibold hover:bg-purple-300 transition"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Content */}
//       {!loading && !error && (
//         <>
//           {/* Filters */}
//           <div className="flex justify-center gap-3 mb-14 flex-wrap">
//             {["all", "pdf", "audio", "video", "note"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setFilter(t)}
//                 className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
//                   ${
//                     filter === t
//                       ? "bg-amber-300 text-blue-900 shadow-lg scale-105"
//                       : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
//                   }`}
//               >
//                 {t.toUpperCase()}
//               </button>
//             ))}
//           </div>

//           {/* Cards */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//             {filtered.map((res) => (
//               <div
//                 key={res._id}
//                 className="group bg-gradient-to-br from-white/10 to-white/5
//                 border border-white/20 rounded-3xl shadow-xl
//                 p-7 flex flex-col h-full transition-all duration-300
//                 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-300/50"
//               >
//                 {/* Icon */}
//                 <div className="w-14 h-14 flex items-center justify-center rounded-xl
//                   bg-white/10 mb-5 group-hover:scale-110 transition">
//                   {typeIcon(res.type)}
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-xl font-bold text-amber-200 leading-snug mb-3 line-clamp-2">
//                   {res.title}
//                 </h2>

//                 {/* Badge */}
//                 <span
//                   className={`w-fit px-3 py-1 rounded-full text-xs font-semibold mb-6
//                     ${
//                       res.type === "pdf"
//                         ? "bg-red-500/20 text-red-300"
//                         : res.type === "audio"
//                         ? "bg-blue-500/20 text-blue-300"
//                         : res.type === "video"
//                         ? "bg-purple-500/20 text-purple-300"
//                         : "bg-green-500/20 text-green-300"
//                     }`}
//                 >
//                   {res.type.toUpperCase()}
//                 </span>

//                 {/* Button */}
//                 <a
//                   href={`${BACKEND_URL}${res.url}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="mt-auto w-full text-center py-3 rounded-xl font-semibold
//                   bg-gradient-to-r from-amber-300 to-yellow-300 text-blue-900
//                   hover:from-purple-400 hover:to-pink-400 hover:text-white transition-all duration-300"
//                 >
//                   Open Resource
//                 </a>
//               </div>
//             ))}

//             {filtered.length === 0 && (
//               <p className="text-center text-blue-200 col-span-full">
//                 No resources available.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ResourcesPage;



import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, FileVideo, FileAudio, Folder } from "lucide-react";

const BACKEND_URL = "https://al-maahir-backend-production.up.railway.app";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/resources");
        setResources(res.data || []);
      } catch {
        setError("Unable to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filtered =
    filter === "all"
      ? resources
      : resources.filter((r) => r.type === filter);

  const typeIcon = (t) => {
    switch (t) {
      case "pdf":
        return <FileText size={24} className="text-red-400" />;
      case "audio":
        return <FileAudio size={24} className="text-blue-400" />;
      case "video":
        return <FileVideo size={24} className="text-purple-400" />;
      case "note":
        return <Folder size={24} className="text-green-400" />;
      default:
        return <Folder size={24} className="text-gray-400" />;
    }
  };

  return (
    <div className="pt-[150px] pb-24 bg-gradient-to-b from-blue-950 to-purple-900 min-h-screen text-white px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-amber-300 tracking-wide">
        Learning Resources
      </h1>

      {loading && (
        <p className="text-center text-blue-200">Loading resources…</p>
      )}

      {!loading && error && (
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-400 font-semibold mb-4">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-300 text-blue-900 rounded-xl font-semibold hover:bg-purple-300 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {["all", "pdf", "audio", "video", "note"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                  ${
                    filter === t
                      ? "bg-amber-300 text-blue-900 shadow-md scale-105"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filtered.map((res) => (
              <div
                key={res._id}
                className="group bg-gradient-to-br from-white/10 to-white/5
                border border-white/20 rounded-2xl shadow-lg
                p-5 flex flex-col h-full transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:border-amber-300/50"
              >
                {/* Icon */}
                <div className="w-11 h-11 flex items-center justify-center rounded-lg
                  bg-white/10 mb-4 group-hover:scale-105 transition">
                  {typeIcon(res.type)}
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-amber-200 leading-snug mb-2 line-clamp-2">
                  {res.title}
                </h2>

                {/* Badge */}
                <span
                  className={`w-fit px-3 py-1 rounded-full text-[11px] font-semibold mb-4
                    ${
                      res.type === "pdf"
                        ? "bg-red-500/20 text-red-300"
                        : res.type === "audio"
                        ? "bg-blue-500/20 text-blue-300"
                        : res.type === "video"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                >
                  {res.type.toUpperCase()}
                </span>

                {/* Button */}
                <a
                  href={`${BACKEND_URL}${res.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto w-full text-center py-2.5 rounded-lg font-semibold text-sm
                  bg-gradient-to-r from-amber-300 to-yellow-300 text-blue-900
                  hover:from-purple-400 hover:to-pink-400 hover:text-white transition-all duration-300"
                >
                  Open File
                </a>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-blue-200 col-span-full">
                No resources available.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResourcesPage;
