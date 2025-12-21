import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil } from "lucide-react";


const AdminFeeStructurePage = () => {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    feePKR: "",
    feeUSD: "",
    feeAED: "",
    feeRiyal: "",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    axios
      .get("/api/courses")
      .then((res) => setCourses(res.data))
      .catch(console.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feeStructure = [
      form.feePKR ? `PKR ${form.feePKR}` : null,
      form.feeUSD ? `$${form.feeUSD}` : null,
      form.feeAED ? `AED ${form.feeAED}` : null,
      form.feeRiyal ? `Riyal ${form.feeRiyal}` : null,
    ].filter(Boolean);

    const payload = {
      title: form.title,
      duration: form.duration,
      feeStructure,
    };

    try {
      if (editingId) {
        await axios.put(`/api/courses/${editingId}`, payload);
        alert("Course updated!");
      } else {
        await axios.post("/api/courses", payload);
        alert("Course added!");
      }

      setForm({
        title: "",
        duration: "",
    feePKR: "",
    feeUSD: "",
    feeAED: "",
    feeRiyal: "",
      });

      setEditingId(null);
      loadCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);

    const PKR = course.feeStructure?.find((f) => f.includes("PKR"))?.replace("PKR", "").trim() || "";
    const USD = course.feeStructure?.find((f) => f.includes("$"))?.replace("$", "").trim() || "";
    const AED = course.feeStructure?.find((f) => f.includes("AED"))?.replace("AED", "").trim() || "";
    const Riy = course.feeStructure?.find((f) => f.toLowerCase().includes("riy"))?.replace(/riy/i, "").trim() || "";

    setForm({
      title: course.title,
      duration: course.duration,
      feePKR: PKR,
      feeUSD: USD,
      feeAED: AED,
      feeRiyal: Riy,
    });
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await axios.delete(`/api/courses/${id}`);
      loadCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-8 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <motion.h1
        className="text-4xl font-extrabold text-center text-amber-300 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Fee Structure Manager
      </motion.h1>

      {/* FORM BOX */}
      <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl shadow-lg border border-purple-300/30">
        <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
          <Plus /> {editingId ? "Edit Course Fee" : "Add Course Fee"}
        </h2>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Course Title"
            className="bg-white/20 border border-purple-300 px-3 py-2 rounded text-white"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Duration"
            className="bg-white/20 border border-purple-300 px-3 py-2 rounded text-white"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />

          <input
            type="number"
            placeholder="Fee in PKR"
            className="bg-white/20 border border-purple-300 px-3 py-2 rounded text-white"
            value={form.feePKR}
            onChange={(e) => setForm({ ...form, feePKR: e.target.value })}
          />

          <input
            type="number"
            placeholder="Fee in USD"
            className="bg-white/20 border border-purple-300 px-3 py-2 rounded text-white"
            value={form.feeUSD}
            onChange={(e) => setForm({ ...form, feeUSD: e.target.value })}
          />

          <input
            type="number"
            placeholder="Fee in AED"
            className="bg-white/20 border border-purple-300 px-3 py-2 rounded text-white"
            value={form.feeAED}
            onChange={(e) => setForm({ ...form, feeAED: e.target.value })}
          />

          <input
            type="number"
            placeholder="Fee in Riyal"
            className="bg-white/20 border border-purple-300 px-3 py-2 rounded text-white"
            value={form.feeRiyal}
            onChange={(e) => setForm({ ...form, feeRiyal: e.target.value })}
          />

          <button className="col-span-full bg-amber-300 text-blue-900 py-2 rounded-lg font-semibold hover:bg-purple-400 transition">
            {editingId ? "Update Fee" : "Add Fee"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto mt-12 bg-white/10 p-6 rounded-xl border border-purple-300/30">
        <h2 className="text-xl font-bold text-amber-300 mb-4">All Courses</h2>

        <table className="w-full text-white text-sm">
          <thead className="bg-purple-800">
            <tr>
              <th className="py-3 px-3">Course</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-3">Fees</th>
              <th className="py-3 px-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c._id} className="border-b border-purple-500/30">
                <td className="py-3 px-3">{c.title}</td>
                <td className="py-3 px-3">{c.duration}</td>
                <td className="py-3 px-3">
                  {c.feeStructure?.join(" | ") || "-"}
                </td>
                <td className="py-3 px-3 flex gap-4">

                  <button
                    onClick={() => handleEdit(c)}
                    className="text-green-300 hover:text-green-200 flex items-center gap-1"
                  >
                    <Pencil size={18} /> Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(c._id)}
                    className="text-red-300 hover:text-red-200 flex items-center gap-1"
                  >
                    <Trash2 size={18} /> Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminFeeStructurePage;
