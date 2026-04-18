// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const ResourceUploader = ({ onUpload }) => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   console.log("FILE STATE:", file);

// if (!file) {
//   alert("Please select a file first");
//   return;
// }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await onUpload(formData);
//       setFile(null);
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-sm text-gray-600">Uploading resource…</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow space-y-4 w-full max-w-lg mx-auto"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="w-full"
//         required
//       />

//       <motion.button
//         type="submit"
//         className="bg-primary text-white px-4 py-2 rounded hover:bg-accent w-full"
//         whileTap={{ scale: 0.95 }}
//       >
//         Upload Resource
//       </motion.button>
//     </motion.form>
//   );
// };

// export default ResourceUploader;



import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://al-maahir-backend-production.up.railway.app";

const ResourceUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ================= CLOUDINARY SIGNED UPLOAD ================= */
  const uploadToCloudinary = async (file) => {
    // 🔥 STEP 1: get signature
    const sigRes = await axios.get(`${API_URL}/api/resources/signature`);
    const { timestamp, signature, apiKey, cloudName } = sigRes.data;

    // 🔥 STEP 2: prepare form
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", apiKey);
    fd.append("timestamp", timestamp);
    fd.append("signature", signature);

    // 🔥 STEP 3: upload
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await res.json();

    console.log("🔥 CLOUD:", data);

    if (!data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);

    try {
      const url = await uploadToCloudinary(file);

      console.log("✅ Cloudinary URL:", url);

      await onUpload({
        title: file.name,
        url: url,
        type: file.type,
      });

      setFile(null);

    } catch (err) {
      console.log("❌ Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

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