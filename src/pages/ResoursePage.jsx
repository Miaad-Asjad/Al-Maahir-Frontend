


import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, FileVideo, FileAudio, Folder } from "lucide-react";

/* ✅ BACKEND BASE URL */
const BACKEND_URL = "https://al-maahir-backend-production.up.railway.app";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH RESOURCES ================= */
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError("");
      setResources([]);

      // Internet check
      if (!navigator.onLine) {
        setError("Internet connection failed. Please check your network.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/resources");
        setResources(res.data || []);
      } catch {
        setError(
          "Unable to load resources at the moment. Please try again later."
        );
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
        return <FileText size={26} className="text-red-400" />;
      case "audio":
        return <FileAudio size={26} className="text-blue-400" />;
      case "video":
        return <FileVideo size={26} className="text-purple-400" />;
      case "note":
        return <Folder size={26} className="text-green-400" />;
      default:
        return <Folder size={26} className="text-gray-400" />;
    }
  };

  return (
    <div className="pt-[150px] pb-20 bg-gradient-to-b from-blue-950 to-purple-900 text-white min-h-screen px-4">

      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-amber-300">
        Learning Resources
      </h1>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-center text-blue-200">
          Loading resources…
        </p>
      )}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-400 font-semibold mb-4">
            ⚠️ {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-amber-300 text-blue-900 rounded-lg font-semibold hover:bg-purple-300 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* ================= DATA ================= */}
      {!loading && !error && (
        <>
          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {["all", "pdf", "audio", "video", "note"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow 
                  ${
                    filter === t
                      ? "bg-amber-300 text-blue-900"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }
                `}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filtered.map((res) => (
              <div
  key={res._id}
  className="bg-white/10 backdrop-blur-lg border border-purple-300/20 
  p-6 rounded-2xl shadow-lg hover:scale-[1.03] transition transform duration-300
  flex flex-col h-full"
>

                {/* ICON + TITLE */}
                <div className="flex items-center gap-3 mb-4">
                  {typeIcon(res.type)}
                  <h2 className="font-semibold text-xl text-amber-200">
                    {res.title}
                  </h2>
                </div>

                {/* Type Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4
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

                {/* ✅ UPDATED BUTTON */}
                <a
                  href={`${BACKEND_URL}${res.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-3 bg-amber-300 text-blue-900 text-center py-2 
                  rounded-lg font-semibold hover:bg-purple-300 transition"
                >
                  View Resource
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
