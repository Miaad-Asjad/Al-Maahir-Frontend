

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

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://al-maahir-backend-production.up.railway.app";

/*  Cloudinary Config (Unsigned) */
const CLOUD_NAME = "dfclbucsk";
const UPLOAD_PRESET = "almaahir_upload";

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

  /*  LOAD  */
  const loadResources = () => {
    axios
      .get(`${API_URL}/api/resources`)
      .then((res) => setResources(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  /*  UPLOAD (FIXED)  */
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

      /*  STEP 1: DIRECT CLOUDINARY UPLOAD */
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: cloudData,
        }
      );

      const data = await res.json();
      console.log("🔥 CLOUD:", data);

      if (!data.secure_url) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      /*  STEP 2: SAVE TO BACKEND */
      await axios.post(
        `${API_URL}/api/resources/upload`,
        {
          title: title || file.name,
          type,
          url: data.secure_url,
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
      setErrorMsg(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /*  DELETE  */
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

  /* EDIT  */
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