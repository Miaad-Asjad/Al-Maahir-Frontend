import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageCircle, Plus, Trash2 } from "lucide-react";

const AdminTestimonialsPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    axios
      .get("/api/testimonials")
      .then((res) => setList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const submitTestimonial = async (e) => {
    e.preventDefault();

    if (!name || !text) return alert("Name and message are required");

    try {
      await axios.post("/api/testimonials", { name, course, text });

      alert("Testimonial added!");
      setName("");
      setCourse("");
      setText("");
      loadTestimonials();
    } catch (err) {
      console.error(err);
      alert("Failed to add testimonial.");
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await axios.delete(`/api/testimonials/${id}`);
      setList((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  if (loading)
    return (
      <div className="pt-[140px] text-center text-white">
        Loading testimonials...
      </div>
    );

  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen 
      bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-center text-amber-300 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Testimonials Manager
      </motion.h1>

      {/* Add Testimonial Form */}
      <div className="max-w-3xl mx-auto bg-white/10 border border-amber-300/30 p-6 rounded-xl shadow-lg mb-12">
        <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
          <Plus /> Add Testimonial
        </h2>

        <form onSubmit={submitTestimonial} className="space-y-4">
          <div>
            <label className="text-sm text-blue-200">Student Name *</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ayesha Malik"
              required
            />
          </div>

          <div>
            <label className="text-sm text-blue-200">Course (Optional)</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300 mt-1"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g. Tajweed Course"
            />
          </div>

          <div>
            <label className="text-sm text-blue-200">Message *</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300 mt-1"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write testimonial message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-300 text-blue-900 font-semibold py-2 rounded-lg hover:bg-purple-400 transition"
          >
            Add Testimonial
          </button>
        </form>
      </div>

      {/* Testimonials List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
          <MessageCircle /> All Testimonials
        </h2>

        {list.length === 0 && <p className="text-blue-200">No testimonials added yet.</p>}

        <div className="space-y-4">
          {list.map((t) => (
            <div
              key={t._id}
              className="bg-white/10 border border-purple-300/20 p-5 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-amber-300">{t.name}</h3>

              {t.course && (
                <p className="text-purple-200 text-sm mb-1">Course: {t.course}</p>
              )}

              <p className="text-blue-100">{t.text}</p>

              <button
                onClick={() => deleteTestimonial(t._id)}
                className="mt-3 flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminTestimonialsPage;
