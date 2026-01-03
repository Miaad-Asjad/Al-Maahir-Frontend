

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Plus, Trash2, Pencil } from "lucide-react";
import Loader from "../components/Loader";

const AdminCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const [form, setForm] = useState({
    title: "",
    date: "",
    details: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    axios
      .get("/api/calendar")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date)
      return alert("Title & Date are required");

    try {
      if (editingId) {
        // Update event
        await axios.put(`/api/calendar/${editingId}`, form);
        alert("Event updated!");
      } else {
        // Add event
        await axios.post("/api/calendar", form);
        alert("Event added!");
      }

      setForm({ title: "", date: "", details: "" });
      setEditingId(null);
      loadEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to save event");
    }
  };

  const handleEdit = (ev) => {
    setEditingId(ev._id);
    setForm({
      title: ev.title,
      date: ev.date,
      details: ev.details || "",
    });
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await axios.delete(`/api/calendar/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

     if (loading) {
    return <Loader text="Calender Events.." />;
  }

  return (
    <div className="pt-[150px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-center text-amber-300 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Academic Calendar Manager
      </motion.h1>

      {/* Add / Edit Form */}
      <div className="max-w-3xl mx-auto bg-white/10 border border-amber-300/30 p-6 rounded-xl shadow-lg mb-12">
        
        <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
          <Plus /> {editingId ? "Edit Event" : "Add New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300"
          />

          <input
            type="text"
            placeholder="Event Date (e.g., 16th & 17th Dec)"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300"
          />

          <textarea
            rows="3"
            placeholder="Details (optional)"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className="w-full px-3 py-2 rounded bg-white/20 text-white border border-purple-300"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-amber-300 text-blue-900 font-semibold py-2 rounded-lg hover:bg-purple-400 transition"
          >
            {editingId ? "Update Event" : "Add Event"}
          </button>

        </form>
      </div>

      {/* Events Table */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
          <Calendar /> All Calendar Events
        </h2>

        <table className="w-full rounded-2xl overflow-hidden shadow-lg text-white">
          <thead className="bg-gradient-to-r from-blue-900 to-purple-900">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-gradient-to-b from-blue-950/80 to-purple-950/80 divide-y divide-purple-800">
            {events.map((ev) => (
              <tr key={ev._id} className="hover:bg-purple-800/30 transition">

                <td className="py-3 px-4 text-purple-200">{ev.date}</td>
                <td className="py-3 px-4 text-blue-100">{ev.title}</td>

                <td className="py-3 px-4 flex gap-4">

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(ev)}
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    <Pencil size={18} /> Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteEvent(ev._id)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
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

export default AdminCalendarPage;
