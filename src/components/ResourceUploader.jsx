import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ResourceUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= PAGE START FROM TOP ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await onUpload(formData);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Uploading resource…</p>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4 w-full max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
        required
      />

      <motion.button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-accent w-full"
        whileTap={{ scale: 0.95 }}
      >
        Upload Resource
      </motion.button>
    </motion.form>
  );
};

export default ResourceUploader;
