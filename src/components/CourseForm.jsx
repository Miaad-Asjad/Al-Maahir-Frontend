import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CourseForm = ({ existingCourse = null, onSuccess }) => {
  const [form, setForm] = useState(
    existingCourse || { title: '', description: '', duration: '', time: '', fee: '' }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingCourse) {
        await axios.put(`/api/courses/${existingCourse._id}`, form);
      } else {
        await axios.post("/api/courses", form);
      }
      onSuccess(); // Refresh list
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  return (
    <motion.form
      className="bg-white p-6 rounded-xl shadow space-y-4 w-full max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
    >
      <input name="title" value={form.title} onChange={handleChange} placeholder="Course Title" className="w-full border p-2 rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description" className="w-full border p-2 rounded" required />
      <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full border p-2 rounded" required />
      <input name="time" value={form.time} onChange={handleChange} placeholder="Class Timings" className="w-full border p-2 rounded" required />
      <input name="fee" value={form.fee} onChange={handleChange} placeholder="Fee" className="w-full border p-2 rounded" required />

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-accent">
        {existingCourse ? "Update Course" : "Add Course"}
      </button>
    </motion.form>
  );
};

export default CourseForm;
