



// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Trash2,
//   Upload,
//   Edit,
//   Save,
//   X,
//   FileText,
//   FileAudio,
//   FileVideo,
//   Folder,
// } from "lucide-react";

// const AdminResourcesPage = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("pdf");

//   const [editingId, setEditingId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editType, setEditType] = useState("");

//   const [filter, setFilter] = useState("all");

//   const [uploading, setUploading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // ✅ REF FOR FILE INPUT RESET
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     loadResources();
//   }, []);

//   const loadResources = () => {
//     axios
//       .get("/api/resources")
//       .then((res) => setResources(res.data))
//       .catch((err) => console.error("❌ Load resources error:", err))
//       .finally(() => setLoading(false));
//   };

//   /* ================= UPLOAD RESOURCE ================= */
//   const uploadResource = async (e) => {
//     e.preventDefault();

//     console.log("🟡 Upload started");

//     setSuccessMsg("");
//     setErrorMsg("");

//     if (!(file instanceof File)) {
//       console.log("🔴 Invalid or no file:", file);
//       setErrorMsg("Please select a file to upload.");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("file", file);
//     fd.append("title", title || file.name);
//     fd.append("type", type);

//     console.log("🟢 FormData ready", {
//       file: file.name,
//       type,
//       title,
//     });

//     try {
//       setUploading(true);
//       console.log("🚀 Sending request...");

//  const res = await axios.post("/api/resources/upload", fd, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//   },
// });

//       console.log("✅ Upload success response:", res.data);

//       setSuccessMsg("✅ Resource uploaded successfully.");
//       setFile(null);
//       setTitle("");

//       // ✅ RESET FILE INPUT SO NEXT UPLOAD WORKS
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       loadResources();
//     } catch (err) {
//       console.log("❌ Upload failed error FULL:", err);
//       console.log("❌ Response:", err?.response);

//       setErrorMsg(
//         err?.response?.data?.message ||
//           "❌ Resource upload failed. Please try again."
//       );
//     } finally {
//       setUploading(false);
//       console.log("🟣 Upload finished");
//     }
//   };

//   /* ================= DELETE ================= */
//   const deleteResource = async (id) => {
//     if (!window.confirm("Delete this resource?")) return;

//     try {
//       await axios.delete(`/api/resources/${id}`);
//       setResources((prev) => prev.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("❌ Delete resource error:", err);
//       alert("Failed to delete resource");
//     }
//   };

//   /* ================= EDIT ================= */
//   const startEdit = (r) => {
//     setEditingId(r._id);
//     setEditTitle(r.title);
//     setEditType(r.type);
//   };

//   const saveEdit = async (id) => {
//     try {
//       await axios.put(`/api/resources/${id}`, {
//         title: editTitle,
//         type: editType,
//       });

//       setEditingId(null);
//       loadResources();
//     } catch (err) {
//       console.error("❌ Update resource error:", err);
//       alert("Failed to update resource");
//     }
//   };

//   const filtered =
//     filter === "all"
//       ? resources
//       : resources.filter((r) => r.type === filter);

//   const typeIcon = (t) => {
//     switch (t) {
//       case "pdf":
//         return <FileText className="text-red-400" />;
//       case "audio":
//         return <FileAudio className="text-blue-400" />;
//       case "video":
//         return <FileVideo className="text-purple-400" />;
//       case "note":
//         return <Folder className="text-green-400" />;
//       default:
//         return <Folder />;
//     }
//   };

//   if (loading)
//     return <div className="pt-[140px] text-center text-white">Loading...</div>;

//   return (
//     <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">
//       <motion.h1
//         className="text-3xl sm:text-4xl font-extrabold text-center text-amber-300 mb-10"
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Resource Manager
//       </motion.h1>

//       {/* Upload Box */}
//       <div className="max-w-3xl mx-auto bg-white/10 border border-amber-300/30 p-6 rounded-xl shadow-lg mb-12">
//         <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
//           <Upload /> Upload New Resource
//         </h2>

//         {successMsg && (
//           <p className="text-green-400 text-sm font-semibold text-center mb-2">
//             {successMsg}
//           </p>
//         )}
//         {errorMsg && (
//           <p className="text-red-400 text-sm font-semibold text-center mb-2">
//             {errorMsg}
//           </p>
//         )}

//         <form onSubmit={uploadResource} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Resource Title"
//             className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             type="file"
//             ref={fileInputRef}
//             className="w-full text-white"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <select
//             className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="pdf">PDF</option>
//             <option value="audio">Audio</option>
//             <option value="video">Video</option>
//             <option value="note">Note</option>
//           </select>

//           <button
//             type="submit"
//             disabled={uploading}
//             className="w-full bg-amber-300 text-blue-900 font-semibold py-2 rounded-lg hover:bg-purple-400 transition disabled:opacity-60"
//           >
//             {uploading ? "Uploading…" : "Upload Resource"}
//           </button>
//         </form>
//       </div>

//       {/* Filters */}
//       <div className="max-w-4xl mx-auto flex gap-3 justify-center mb-8">
//         {["all", "pdf", "audio", "video", "note"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setFilter(t)}
//             className={`px-4 py-2 rounded-lg ${
//               filter === t
//                 ? "bg-amber-300 text-blue-900 font-semibold"
//                 : "bg-white/10 text-white border border-white/20"
//             }`}
//           >
//             {t.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Resource Grid */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {filtered.map((r) => (
//           <div
//             key={r._id}
//             className="bg-white/10 p-5 rounded-xl shadow-md border border-purple-300/20"
//           >
//             {editingId === r._id ? (
//               <>
//                 <input
//                   type="text"
//                   className="w-full bg-white/20 px-3 py-2 rounded mt-2 text-white"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />

//                 <select
//                   className="w-full bg-white/20 px-3 py-2 rounded mt-2 text-white"
//                   value={editType}
//                   onChange={(e) => setEditType(e.target.value)}
//                 >
//                   <option value="pdf">PDF</option>
//                   <option value="audio">Audio</option>
//                   <option value="video">Video</option>
//                   <option value="note">Note</option>
//                 </select>

//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => saveEdit(r._id)}
//                     className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg"
//                   >
//                     <Save size={18} /> Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg"
//                   >
//                     <X size={18} /> Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="mb-3 flex items-center gap-2 text-lg">
//                   {typeIcon(r.type)}
//                   <span className="font-semibold">{r.title}</span>
//                 </div>

//                 <p className="text-sm text-blue-200 mb-3">
//                   Type: <span className="text-white">{r.type}</span>
//                 </p>

//                 <div className="flex gap-4 mt-4">
//                   <button
//                     onClick={() => startEdit(r)}
//                     className="text-green-400 hover:text-green-300 flex items-center gap-1"
//                   >
//                     <Edit size={18} /> Edit
//                   </button>

//                   <button
//                     onClick={() => deleteResource(r._id)}
//                     className="text-red-400 hover:text-red-300 flex items-center gap-1"
//                   >
//                     <Trash2 size={18} /> Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminResourcesPage;




// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Trash2,
//   Upload,
//   Edit,
//   Save,
//   X,
//   FileText,
//   FileAudio,
//   FileVideo,
//   Folder,
// } from "lucide-react";

// /* ================= API URL FIX ================= */
// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://al-maahir-backend-production.up.railway.app";
// const AdminResourcesPage = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("pdf");

//   const [editingId, setEditingId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editType, setEditType] = useState("");

//   const [filter, setFilter] = useState("all");

//   const [uploading, setUploading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     loadResources();
//   }, []);

//   /* ================= LOAD ================= */
//  const uploadResource = async (e) => {
//   e.preventDefault();

//   setSuccessMsg("");
//   setErrorMsg("");

//   if (!(file instanceof File)) {
//     setErrorMsg("Please select a file.");
//     return;
//   }

//   try {
//     setUploading(true);

//     /* ================= STEP 1: CLOUDINARY UPLOAD ================= */
//     const cloudData = new FormData();
//     cloudData.append("file", file);
//     cloudData.append("upload_preset", "almaahir_upload");

//     const cloudRes = await fetch(
//       "https://api.cloudinary.com/v1_1/dfclbucksk/auto/upload",
//       {
//         method: "POST",
//         body: cloudData,
//       }
//     );

//     const cloudResult = await cloudRes.json();

//     if (!cloudResult.secure_url) {
//       throw new Error("Cloudinary upload failed");
//     }

//     console.log("✅ Cloudinary URL:", cloudResult.secure_url);

//     /* ================= STEP 2: SEND URL TO BACKEND ================= */
//     const res = await axios.post(
//       `${API_URL}/api/resources/upload`,
//       {
//         title: title || file.name,
//         type: type,
//         url: cloudResult.secure_url,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       }
//     );

//     console.log("✅ Upload success:", res.data);

//     setSuccessMsg("✅ Uploaded successfully!");
//     setFile(null);
//     setTitle("");

//     if (fileInputRef.current) fileInputRef.current.value = "";

//     loadResources();

//   } catch (err) {
//     console.log("❌ Upload error:", err);

//     setErrorMsg(
//       err?.response?.data?.message || "Upload failed. Try again."
//     );
//   } finally {
//     setUploading(false);
//   }
// };

//   /* ================= EDIT ================= */
//   const startEdit = (r) => {
//     setEditingId(r._id);
//     setEditTitle(r.title);
//     setEditType(r.type);
//   };

//   const saveEdit = async (id) => {
//     try {
//       await axios.put(
//         `${API_URL}/api/resources/${id}`,
//         {
//           title: editTitle,
//           type: editType,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );

//       setEditingId(null);
//       loadResources();
//     } catch {
//       alert("Update failed");
//     }
//   };

//   const filtered =
//     filter === "all"
//       ? resources
//       : resources.filter((r) => r.type === filter);

//   const typeIcon = (t) => {
//     switch (t) {
//       case "pdf":
//         return <FileText className="text-red-400" />;
//       case "audio":
//         return <FileAudio className="text-blue-400" />;
//       case "video":
//         return <FileVideo className="text-purple-400" />;
//       case "note":
//         return <Folder className="text-green-400" />;
//       default:
//         return <Folder />;
//     }
//   };

//   if (loading)
//     return <div className="pt-[140px] text-center text-white">Loading...</div>;

//   return (
//     <div className="pt-[140px] pb-20 px-4 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">
//       <motion.h1 className="text-3xl font-bold text-center text-amber-300 mb-10">
//         Resource Manager
//       </motion.h1>

//       {/* Upload */}
//       <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl mb-10">
//         {successMsg && <p className="text-green-400">{successMsg}</p>}
//         {errorMsg && <p className="text-red-400">{errorMsg}</p>}

//         <form onSubmit={uploadResource} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full p-2 bg-white/20 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="w-full p-2 bg-white/20 rounded"
//           >
//             <option value="pdf">PDF</option>
//             <option value="audio">Audio</option>
//             <option value="video">Video</option>
//             <option value="note">Note</option>
//           </select>

//           <button
//             type="submit"
//             disabled={uploading}
//             className="w-full bg-amber-300 text-blue-900 py-2 rounded"
//           >
//             {uploading ? "Uploading..." : "Upload"}
//           </button>
//         </form>
//       </div>

//       {/* Resources */}
//       <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {filtered.map((r) => (
//           <div key={r._id} className="bg-white/10 p-4 rounded-lg">
//             <div className="flex gap-2 items-center mb-2">
//               {typeIcon(r.type)}
//               <span>{r.title}</span>
//             </div>

//             <div className="flex gap-3">
//               <button onClick={() => startEdit(r)}>Edit</button>
//               <button onClick={() => deleteResource(r._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminResourcesPage;


import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Trash2,
  Edit,
  Save,
  X,
  FileText,
  FileAudio,
  FileVideo,
  Folder,
} from "lucide-react";

/* ================= API URL ================= */
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://al-maahir-backend-production.up.railway.app";

const AdminResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState("");

  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = () => {
    axios
      .get(`${API_URL}/api/resources`)
      .then((res) => setResources(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  
  const uploadResource = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (!(file instanceof File)) {
      setErrorMsg("Please select a file.");
      return;
    }

    try {
      setUploading(true);

      // 🔥 Cloudinary upload
      // const cloudData = new FormData();
      // cloudData.append("file", file);
      // cloudData.append("upload_preset", "almaahir");

      // const cloudRes = await fetch(
      //   "https://api.cloudinary.com/v1_1/dfclbucksk/auto/upload",
      //   {
      //     method: "POST",
      //     body: cloudData,
      //   }
      // );

      // const cloudResult = await cloudRes.json();

      // if (!cloudResult.secure_url) {
      //   throw new Error("Cloudinary upload failed");
      // }

const uploadResource = async (e) => {
  e.preventDefault();

  if (!(file instanceof File)) {
    alert("Select file");
    return;
  }

  try {
    /* ✅ YE LINE ADD KARO (MISSING THI) */
    const cloudData = new FormData();

    cloudData.append("file", file, file.name);
    cloudData.append("upload_preset", "almaahir");

    const cloudRes = await fetch(
      "https://api.cloudinary.com/v1_1/dfclbucksk/auto/upload",
      {
        method: "POST",
        body: cloudData,
      }
    );

    const cloudResult = await cloudRes.json();

    console.log("🔥 CLOUD RESULT:", cloudResult);

  } catch (err) {
    console.log(err);
  }
};

      // 🔥 Save in backend
      await axios.post(
        `${API_URL}/api/resources/upload`,
        {
          title: title || file.name,
          type,
          url: cloudResult.secure_url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setSuccessMsg("✅ Uploaded successfully!");
      setFile(null);
      setTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      loadResources();

    } catch (err) {
      console.log(err);
      setErrorMsg("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteResource = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      await axios.delete(`${API_URL}/api/resources/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const startEdit = (r) => {
    setEditingId(r._id);
    setEditTitle(r.title);
    setEditType(r.type);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/resources/${id}`,
        {
          title: editTitle,
          type: editType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setEditingId(null);
      loadResources();
    } catch {
      alert("Update failed");
    }
  };

  /* ================= ICON ================= */
  const typeIcon = (t) => {
    switch (t) {
      case "pdf":
        return <FileText className="text-red-400" />;
      case "audio":
        return <FileAudio className="text-blue-400" />;
      case "video":
        return <FileVideo className="text-purple-400" />;
      default:
        return <Folder className="text-green-400" />;
    }
  };

  if (loading) {
    return <div className="pt-[140px] text-center text-white">Loading...</div>;
  }

  return (
    <div className="pt-[140px] pb-20 px-4 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <motion.h1 className="text-3xl font-bold text-center text-amber-300 mb-10">
        Resource Manager
      </motion.h1>

      {/* Upload */}
      <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl mb-10">
        {successMsg && <p className="text-green-400">{successMsg}</p>}
        {errorMsg && <p className="text-red-400">{errorMsg}</p>}

        <form onSubmit={uploadResource} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 bg-white/20 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 bg-white/20 rounded"
          >
            <option value="pdf">PDF</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="note">Note</option>
          </select>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-amber-300 text-blue-900 py-2 rounded"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {/* Resources */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {resources.map((r) => (
          <div key={r._id} className="bg-white/10 p-4 rounded-lg">

            <div className="flex gap-2 items-center mb-2">
              {typeIcon(r.type)}
              {editingId === r._id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-white/20 p-1 rounded"
                />
              ) : (
                <span>{r.title}</span>
              )}
            </div>

            <div className="flex gap-3">

              {editingId === r._id ? (
                <>
                  <button onClick={() => saveEdit(r._id)}>
                    <Save size={18} />
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    <X size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(r)}>
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteResource(r._id)}>
                    <Trash2 size={18} />
                  </button>
                </>
              )}

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResourcesPage;