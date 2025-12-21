


import { useState } from "react";
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

  /* ================= 🔑 AUTO FIELD NAME GENERATOR ================= */
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

  /* ================= FORM FIELD BUILDER ================= */

  const addField = () => {
    setFormFields([
      ...formFields,
      {
        name: "",        // 🔥 auto generated
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

    // 🔥 AUTO-GENERATE NAME FROM LABEL
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

  /* ================= SUBMIT ================= */

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

          {/* OTHER COURSE FIELDS (UNCHANGED) */}
          {/* ... tumhara baqi code bilkul same hai ... */}

          {/* 🔥 ENROLLMENT QUESTIONS BUILDER */}
          <hr className="my-6 opacity-30" />

          <h2 className="text-xl font-bold text-amber-300">
            Enrollment Form Questions
          </h2>

          {formFields.map((f, i) => (
            <div
              key={i}
              className="border border-white/20 p-4 rounded-lg space-y-2"
            >
              {/* ❌ FIELD NAME INPUT REMOVED */}
              {/* ✅ ADMIN ONLY SEES QUESTION LABEL */}

              <input
                placeholder="Question (e.g. Can you commit to 90% attendance?)"
                value={f.label}
                onChange={(e) => updateField(i, "label", e.target.value)}
                className="w-full px-3 py-2 rounded bg-white text-black"
              />

              {/* OPTIONAL — SHOW GENERATED KEY (READ ONLY) */}
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
