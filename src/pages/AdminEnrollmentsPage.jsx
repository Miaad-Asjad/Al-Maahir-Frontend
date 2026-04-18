

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Eye, Download, X, Trash2 } from "lucide-react";


const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/attach|your|file|select|upload/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
};

const statusStyles = {
  pending: { badge: "bg-yellow-400 text-black", card: "border-yellow-400/40" },
  contacted: { badge: "bg-yellow-300 text-black", card: "border-yellow-300/40" },
  accepted: { badge: "bg-green-500 text-white", card: "border-green-500/40" },
  rejected: { badge: "bg-red-500 text-white", card: "border-red-500/40" },
};

const AdminEnrollmentsPage = () => {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [openGroup, setOpenGroup] = useState(null);
  const [selected, setSelected] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

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

  const deleteEnrollment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/enroll/${id}`);

      setGroups((prev) => {
        const copy = { ...prev };

        Object.keys(copy).forEach((k) => {
          copy[k].enrollments = copy[k].enrollments.filter(
            (e) => e._id !== id
          );
        });

        return copy;
      });

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
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
            <div key={slug} className="bg-white/10 rounded-xl border border-amber-400/20">
              <button
                onClick={() => setOpenGroup(openGroup === slug ? null : slug)}
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
                    const style = statusStyles[stu.status] || statusStyles.pending;

                    return (
                      <div
                        key={stu._id}
                        className={`bg-white/5 p-4 rounded-lg border ${style.card}
                        flex justify-between items-center`}
                      >
                        <div>
                          <p className="font-semibold text-amber-200">{stu.name}</p>

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
                            onChange={(e) => updateStatus(stu._id, e.target.value)}
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
                            <button
                              onClick={() => deleteEnrollment(stu._id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={18} />
                            </button>
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

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-xl p-6 relative overflow-y-auto max-h-[90vh]">

            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-gray-500">
              <X />
            </button>

            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Enrollment Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Course:</b> {selected.courseName}</p>
            </div>

            {selected.customFields && Object.keys(selected.customFields).length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold text-purple-600">Additional Details</h3>

                {Object.entries(selected.customFields).map(([key, value]) => (
                  <p key={key} className="text-sm text-gray-700">
                    <b>{formatLabel(key)}:</b> {value}
                  </p>
                ))}
              </div>
            )}

            {/* FILES */}
            <div className="mt-5">
              <h3 className="font-semibold text-purple-600 mb-3">
                Uploaded Files
              </h3>

              {selected.files && Object.keys(selected.files).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(selected.files).map(([key, file]) => {
                    const url = file.url;

                    const isImage = url.match(/\.(jpg|jpeg|png|webp)$/i);
                    const isAudio = url.match(/\.(mp3|wav|ogg|m4a)$/i);

                    return (
                      <div key={key} className="bg-purple-50 p-3 rounded-lg shadow">
                        <p className="text-sm font-semibold mb-2 break-words">
                          {formatLabel(key)}
                        </p>

                        {isImage && (
                          <img
                            src={url}
                            alt=""
                            onClick={() => setPreviewImg(url)}
                            className="w-full h-40 object-cover rounded cursor-pointer"
                          />
                        )}

                        {isAudio && (
                          <audio controls className="w-full">
                            <source src={url} />
                          </audio>
                        )}

                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 flex items-center justify-center gap-2 bg-purple-700 text-white px-3 py-2 rounded text-sm"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No files uploaded</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default AdminEnrollmentsPage;