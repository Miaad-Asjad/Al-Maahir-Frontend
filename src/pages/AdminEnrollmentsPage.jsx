

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Eye, Download, X } from "lucide-react";


const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/Yes No/i, "?")
    .trim();
};


const statusStyles = {
  pending: {
    badge: "bg-yellow-400 text-black",
    card: "border-yellow-400/40",
  },
  contacted: {
    badge: "bg-yellow-300 text-black",
    card: "border-yellow-300/40",
  },
  accepted: {
    badge: "bg-green-500 text-white",
    card: "border-green-500/40",
  },
  rejected: {
    badge: "bg-red-500 text-white",
    card: "border-red-500/40",
  },
};

const AdminEnrollmentsPage = () => {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [openGroup, setOpenGroup] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/enroll/grouped")
      .then((res) => setGroups(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/api/enroll/${id}/status`, { status });
    setGroups((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((k) => {
        copy[k].enrollments = copy[k].enrollments.map((e) =>
          e._id === id ? { ...e, status } : e
        );
      });
      return copy;
    });
  };

  if (loading) {
    return (
      <div className="pt-[140px] min-h-screen flex justify-center items-center text-white">
        Loading enrollments…
      </div>
    );
  }

  return (
    <div className="pt-[120px] pb-20 px-4 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-center text-amber-300 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Enrollments
      </motion.h1>

      <div className="max-w-5xl mx-auto space-y-6">
        {Object.keys(groups).map((slug) => {
          const group = groups[slug];

          return (
            <div
              key={slug}
              className="bg-white/10 rounded-xl border border-amber-400/20"
            >
              <button
                onClick={() =>
                  setOpenGroup(openGroup === slug ? null : slug)
                }
                className="w-full px-5 py-4 flex justify-between items-center text-amber-300 font-semibold"
              >
                {group.courseTitle}
                <span className="flex items-center gap-2">
                  ({group.enrollments.length})
                  {openGroup === slug ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>

              {openGroup === slug && (
                <div className="p-5 space-y-4">
                  {group.enrollments.map((stu) => {
                    const style =
                      statusStyles[stu.status] || statusStyles.pending;

                    return (
                      <div
                        key={stu._id}
                        className={`bg-white/5 p-4 rounded-lg border ${style.card}
                        flex justify-between items-center`}
                      >
                        <div>
                          <p className="font-semibold text-amber-200">
                            {stu.name}
                          </p>

                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded-full
                            text-xs font-semibold ${style.badge}`}
                          >
                            {stu.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex gap-3 items-center">
                          <select
                            value={stu.status}
                            onChange={(e) =>
                              updateStatus(stu._id, e.target.value)
                            }
                            className="bg-purple-800 text-white px-2 py-1 rounded"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>

                          <button
                            onClick={() => setSelected(stu)}
                            className="text-amber-300 hover:text-amber-200"
                          >
                            <Eye />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-gray-900 w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Enrollment Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Email:</b> {selected.email || "—"}</p>
              <p><b>Phone:</b> {selected.phone || "—"}</p>
              <p><b>Course:</b> {selected.courseName}</p>
            </div>

            {/* ⭐ CLEAN FORM DATA */}
            {selected.customFields && (
              <div className="mt-4">
                <h3 className="font-semibold text-purple-600 mb-2">
                  Form Data
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {Object.entries(selected.customFields).map(([k, v]) => (
                    <div
                      key={k}
                      className="bg-purple-50 px-3 py-2 rounded text-gray-800"
                    >
                      <b>{formatLabel(k)}:</b> {String(v)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FILE */}
            <div className="mt-5">
              <h3 className="font-semibold text-purple-600 mb-2">
                Uploaded File
              </h3>

              {selected.file ? (
                <a
                  href={`${import.meta.env.VITE_API_URL || "http://localhost:2000"}/uploads/${selected.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
                >
                  <Download size={18} /> View / Download
                </a>
              ) : (
                <p className="text-gray-500 text-sm">
                  No file uploaded
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollmentsPage;
