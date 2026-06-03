


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";

const AdminAddCoursePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    introduction: "",
    duration: "",
    days: "",
    time: "",
    startingDate: "",
    feeStructure: "",
    contents: "",
    objectives: "",
    whoCanJoin: "",
    medium: "",
    note: "",
    contact: "",
    whatsappGroupLink: "",
    slug: "",
  });

  /* 🔥 ENROLLMENT QUESTIONS STATE */
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const generateFieldName = (label) => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((word, index) =>
        index === 0
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };

  

  const addField = () => {
    setFormFields([
      ...formFields,
      {
        name: "",        //  auto generated
        label: "",
        type: "text",
        required: false,
        options: [],
        accept: "",
      },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...formFields];
    updated[index][key] = value;

    //  AUTO-GENERATE NAME FROM LABEL
    if (key === "label") {
      updated[index].name = generateFieldName(value);
    }

    setFormFields(updated);
  };

  const updateOptions = (index, value) => {
    const updated = [...formFields];
    updated[index].options = value.split("\n").filter(Boolean);
    setFormFields(updated);
  };

  const removeField = (index) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        formFields,
        feeStructure: form.feeStructure.split("\n").filter(Boolean),
        contents: form.contents.split("\n").filter(Boolean),
        objectives: form.objectives.split("\n").filter(Boolean),
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/courses`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("Course added successfully!");
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

   if (loading) {
    return <Loader text="Add course..." />;
  }

  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen 
      bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-extrabold text-center text-amber-300 mb-6">
          Add New Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="block mb-1 text-amber-200">Course Title *</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block mb-1 text-amber-200">
              Course Slug (unique)
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="tajweed-al-quran"
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          {/* INTRODUCTION */}
<div>
  <label className="block mb-1 text-amber-200">Introduction</label>
  <textarea
    name="introduction"
    value={form.introduction}
    onChange={handleChange}
    rows={4}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* DURATION */}
<div>
  <label className="block mb-1 text-amber-200">Duration</label>
  <input
    name="duration"
    value={form.duration}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* DAYS */}
<div>
  <label className="block mb-1 text-amber-200">Days</label>
  <input
    name="days"
    value={form.days}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* TIME */}
<div>
  <label className="block mb-1 text-amber-200">Time</label>
  <input
    name="time"
    value={form.time}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* STARTING DATE */}
<div>
  <label className="block mb-1 text-amber-200">Starting Date</label>
  <input
    name="startingDate"
    value={form.startingDate}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* CONTENTS */}
<div>
  <label className="block mb-1 text-amber-200">
    Course Contents (one per line)
  </label>
  <textarea
    name="contents"
    value={form.contents}
    onChange={handleChange}
    rows={5}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* OBJECTIVES */}
<div>
  <label className="block mb-1 text-amber-200">
    Objectives (one per line)
  </label>
  <textarea
    name="objectives"
    value={form.objectives}
    onChange={handleChange}
    rows={5}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* WHO CAN JOIN */}
<div>
  <label className="block mb-1 text-amber-200">Who Can Join</label>
  <textarea
    name="whoCanJoin"
    value={form.whoCanJoin}
    onChange={handleChange}
    rows={4}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* FEE STRUCTURE */}
<div>
  <label className="block mb-1 text-amber-200">
    Fee Structure (one per line)
  </label>
  <textarea
    name="feeStructure"
    value={form.feeStructure}
    onChange={handleChange}
    rows={4}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* MEDIUM */}
<div>
  <label className="block mb-1 text-amber-200">Medium</label>
  <input
    name="medium"
    value={form.medium}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* NOTE */}
<div>
  <label className="block mb-1 text-amber-200">Note</label>
  <textarea
    name="note"
    value={form.note}
    onChange={handleChange}
    rows={4}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* CONTACT */}
<div>
  <label className="block mb-1 text-amber-200">Contact</label>
  <input
    name="contact"
    value={form.contact}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

{/* WHATSAPP */}
<div>
  <label className="block mb-1 text-amber-200">
    WhatsApp Group Link
  </label>
  <input
    name="whatsappGroupLink"
    value={form.whatsappGroupLink}
    onChange={handleChange}
    className="w-full px-3 py-2 rounded bg-white text-black"
  />
</div>

          {/*  ENROLLMENT QUESTIONS BUILDER */}
          <hr className="my-6 opacity-30" />

          <h2 className="text-xl font-bold text-amber-300">
            Enrollment Form Questions
          </h2>

          {formFields.map((f, i) => (
            <div
              key={i}
              className="border border-white/20 p-4 rounded-lg space-y-2"
            >
          

              <input
                placeholder="Question (e.g. Can you commit to 90% attendance?)"
                value={f.label}
                onChange={(e) => updateField(i, "label", e.target.value)}
                className="w-full px-3 py-2 rounded bg-white text-black"
              />

              
              {f.name && (
                <p className="text-xs text-blue-200">
                  System key: <span className="italic">{f.name}</span>
                </p>
              )}

              <select
                value={f.type}
                onChange={(e) => updateField(i, "type", e.target.value)}
                className="w-full px-3 py-2 rounded bg-white text-black"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="tel">Phone</option>
                <option value="textarea">Textarea</option>
                <option value="radio">Radio</option>
                <option value="file">File</option>
              </select>

              {f.type === "radio" && (
                <textarea
                  placeholder="Radio options (one per line)"
                  onChange={(e) => updateOptions(i, e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white text-black"
                />
              )}

              {f.type === "file" && (
                <input
                  placeholder="Accept (e.g. audio/*)"
                  value={f.accept}
                  onChange={(e) => updateField(i, "accept", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white text-black"
                />
              )}

              <label className="flex gap-2 items-center text-sm">
                <input
                  type="checkbox"
                  checked={f.required}
                  onChange={(e) =>
                    updateField(i, "required", e.target.checked)
                  }
                />
                Required
              </label>

              <button
                type="button"
                onClick={() => removeField(i)}
                className="text-red-400 text-sm"
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="mt-3 bg-green-500 text-black px-4 py-2 rounded"
          >
            + Add Question
          </button>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-300 text-blue-900 font-bold py-2 rounded-lg hover:bg-purple-400 transition mt-6"
          >
            {loading ? "Saving..." : "Save Course"}
          </button>

          <Link
            to="/admin/courses"
            className="block text-center mt-3 text-amber-200 hover:text-white"
          >
            ← Back to Courses
          </Link>

        </form>
      </div>
    </div>
  );
};

export default AdminAddCoursePage;
