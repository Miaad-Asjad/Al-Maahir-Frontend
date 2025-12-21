
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams, Link } from "react-router-dom";

// const AdminEditCoursePage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState(null);

//   /* 🔥 NEW — ENROLLMENT QUESTIONS STATE */
//   const [formFields, setFormFields] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* ================= LOAD COURSE ================= */
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/courses/${slug}`)
//       .then((res) => {
//         const c = res.data;

//         setForm({
//           title: c.title || "",
//           description: c.description || "",
//           introduction: c.introduction || "",
//           duration: c.duration || "",
//           days: c.days || "",
//           time: c.time || "",
//           startingDate: c.startingDate || "",
//           feeStructure: (c.feeStructure || []).join("\n"),
//           contents: (c.contents || []).join("\n"),
//           objectives: (c.objectives || []).join("\n"),
//           whoCanJoin: c.whoCanJoin || "",
//           medium: c.medium || "",
//           note: c.note || "",
//           contact: c.contact || "",
//           whatsappGroupLink: c.whatsappGroupLink || "",
//           slug: c.slug || "",
//         });

//         /* ⭐ LOAD ENROLLMENT QUESTIONS */
//         setFormFields(c.formFields || []);

//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Course not found");
//         navigate("/admin/courses");
//       });
//   }, [slug, navigate]);

//   /* ================= CHANGE HANDLER ================= */
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   /* ================= FORM FIELD BUILDER ================= */

//   const addField = () => {
//     setFormFields([
//       ...formFields,
//       {
//         name: "",
//         label: "",
//         type: "text",
//         required: false,
//         options: [],
//         accept: "",
//       },
//     ]);
//   };

//   const updateField = (index, key, value) => {
//     const updated = [...formFields];
//     updated[index][key] = value;
//     setFormFields(updated);
//   };

//   const updateOptions = (index, value) => {
//     const updated = [...formFields];
//     updated[index].options = value.split("\n").filter(Boolean);
//     setFormFields(updated);
//   };

//   const removeField = (index) => {
//     setFormFields(formFields.filter((_, i) => i !== index));
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const payload = {
//         ...form,
//         formFields,
//         contents: form.contents.split("\n").filter(Boolean),
//         objectives: form.objectives.split("\n").filter(Boolean),
//         feeStructure: form.feeStructure.split("\n").filter(Boolean),
//       };

//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/courses/${slug}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );

//       alert("Course updated successfully!");
//       navigate("/admin/courses");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update course");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading || !form) {
//     return (
//       <div className="pt-[140px] min-h-screen flex items-center justify-center bg-white">
//         <h2 className="text-xl text-gray-600">Loading course…</h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen
//       bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white"
//     >
//       <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-extrabold text-center text-amber-300 mb-6">
//           Edit Course
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* TITLE */}
//           <div>
//             <label className="text-amber-200 block mb-1">Course Title *</label>
//             <input
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* SLUG */}
//           <div>
//             <label className="text-amber-200 block mb-1">Course Slug</label>
//             <input
//               name="slug"
//               value={form.slug}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* DESCRIPTION */}
//           <div>
//             <label className="text-amber-200 block mb-1">
//               Short Description
//             </label>
//             <input
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* INTRODUCTION */}
//           <div>
//             <label className="text-amber-200 block mb-1">Introduction</label>
//             <textarea
//               name="introduction"
//               value={form.introduction}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* CONTENTS */}
//           <div>
//             <label className="text-amber-200 block mb-1">
//               Contents (one per line)
//             </label>
//             <textarea
//               name="contents"
//               value={form.contents}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* OBJECTIVES */}
//           <div>
//             <label className="text-amber-200 block mb-1">
//               Objectives (one per line)
//             </label>
//             <textarea
//               name="objectives"
//               value={form.objectives}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* SIMPLE FIELDS */}
//           {[
//             "duration",
//             "days",
//             "time",
//             "startingDate",
//             "whoCanJoin",
//             "medium",
//             "note",
//             "contact",
//           ].map((field) => (
//             <div key={field}>
//               <label className="text-amber-200 block mb-1 capitalize">
//                 {field.replace(/([A-Z])/g, " $1")}
//               </label>
//               <input
//                 name={field}
//                 value={form[field]}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 rounded bg-white text-black"
//               />
//             </div>
//           ))}

//           {/* FEES */}
//           <div>
//             <label className="text-amber-200 block mb-1">
//               Fee Structure (one per line)
//             </label>
//             <textarea
//               name="feeStructure"
//               value={form.feeStructure}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* WHATSAPP */}
//           <div>
//             <label className="text-amber-200 block mb-1">
//               WhatsApp Group Link
//             </label>
//             <input
//               name="whatsappGroupLink"
//               value={form.whatsappGroupLink}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-white text-black"
//             />
//           </div>

//           {/* 🔥 ENROLLMENT QUESTIONS BUILDER */}
//           <hr className="my-6 opacity-30" />

//           <h2 className="text-xl font-bold text-amber-300">
//             Enrollment Form Questions
//           </h2>

//           {formFields.map((f, i) => (
//             <div
//               key={i}
//               className="border border-white/20 p-4 rounded-lg space-y-2"
//             >
//               <input
//                 placeholder="Field name (unique key)"
//                 value={f.name}
//                 onChange={(e) => updateField(i, "name", e.target.value)}
//                 className="w-full px-3 py-2 rounded bg-white text-black"
//               />

//               <input
//                 placeholder="Question label"
//                 value={f.label}
//                 onChange={(e) => updateField(i, "label", e.target.value)}
//                 className="w-full px-3 py-2 rounded bg-white text-black"
//               />

//               <select
//                 value={f.type}
//                 onChange={(e) => updateField(i, "type", e.target.value)}
//                 className="w-full px-3 py-2 rounded bg-white text-black"
//               >
//                 <option value="text">Text</option>
//                 <option value="email">Email</option>
//                 <option value="number">Number</option>
//                 <option value="tel">Phone</option>
//                 <option value="textarea">Textarea</option>
//                 <option value="radio">Radio</option>
//                 <option value="file">File</option>
//               </select>

//               {f.type === "radio" && (
//                 <textarea
//                   placeholder="Radio options (one per line)"
//                   onChange={(e) => updateOptions(i, e.target.value)}
//                   className="w-full px-3 py-2 rounded bg-white text-black"
//                 />
//               )}

//               {f.type === "file" && (
//                 <input
//                   placeholder="Accept (e.g. audio/*)"
//                   value={f.accept}
//                   onChange={(e) => updateField(i, "accept", e.target.value)}
//                   className="w-full px-3 py-2 rounded bg-white text-black"
//                 />
//               )}

//               <label className="flex gap-2 items-center text-sm">
//                 <input
//                   type="checkbox"
//                   checked={f.required}
//                   onChange={(e) =>
//                     updateField(i, "required", e.target.checked)
//                   }
//                 />
//                 Required
//               </label>

//               <button
//                 type="button"
//                 onClick={() => removeField(i)}
//                 className="text-red-400 text-sm"
//               >
//                 Remove Question
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addField}
//             className="mt-3 bg-green-500 text-black px-4 py-2 rounded"
//           >
//             + Add Question
//           </button>

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             disabled={saving}
//             className="w-full bg-amber-300 text-blue-900 font-bold py-2 rounded-lg hover:bg-purple-400 transition mt-6"
//           >
//             {saving ? "Updating..." : "Update Course"}
//           </button>

//           <Link
//             to="/admin/courses"
//             className="block text-center text-amber-200 hover:text-white mt-3"
//           >
//             ← Back to Courses
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCoursePage;



import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const AdminEditCoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [formFields, setFormFields] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= AUTO FIELD NAME GENERATOR ================= */
  const generateFieldName = (label) => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join("");
  };

  /* ================= LOAD COURSE ================= */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/courses/${slug}`)
      .then((res) => {
        const c = res.data;

        setForm({
          title: c.title || "",
          slug: c.slug || "",
          description: c.description || "",
          introduction: c.introduction || "",
          duration: c.duration || "",
          days: c.days || "",
          time: c.time || "",
          startingDate: c.startingDate || "",
          feeStructure: (c.feeStructure || []).join("\n"),
          contents: (c.contents || []).join("\n"),
          objectives: (c.objectives || []).join("\n"),
          whoCanJoin: c.whoCanJoin || "",
          medium: c.medium || "",
          note: c.note || "",
          contact: c.contact || "",
          whatsappGroupLink: c.whatsappGroupLink || "",
        });

        setFormFields(c.formFields || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Course not found");
        navigate("/admin/courses");
      });
  }, [slug, navigate]);

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= ENROLLMENT BUILDER ================= */

  const addField = () => {
    setFormFields([
      ...formFields,
      {
        name: "",
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

    // auto-generate key ONLY if new field
    if (key === "label" && !updated[index].name) {
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
    setSaving(true);

    try {
      const payload = {
        ...form,
        formFields,
        feeStructure: form.feeStructure.split("\n").filter(Boolean),
        contents: form.contents.split("\n").filter(Boolean),
        objectives: form.objectives.split("\n").filter(Boolean),
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/courses/${slug}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("Course updated successfully!");
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-xl text-gray-600">Loading course…</h2>
      </div>
    );
  }

  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen
      bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-extrabold text-center text-amber-300 mb-6">
          Edit Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ===== COURSE DETAILS ===== */}
          <div>
            <label className="text-amber-200 block mb-1">Course Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="text-amber-200 block mb-1">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="text-amber-200 block mb-1">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="text-amber-200 block mb-1">Introduction</label>
            <textarea
              name="introduction"
              value={form.introduction}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          {[
            "duration",
            "days",
            "time",
            "startingDate",
            "whoCanJoin",
            "medium",
            "note",
            "contact",
          ].map((field) => (
            <div key={field}>
              <label className="text-amber-200 block mb-1 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-white text-black"
              />
            </div>
          ))}

          <div>
            <label className="text-amber-200 block mb-1">
              Fee Structure (one per line)
            </label>
            <textarea
              name="feeStructure"
              value={form.feeStructure}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="text-amber-200 block mb-1">
              WhatsApp Group Link
            </label>
            <input
              name="whatsappGroupLink"
              value={form.whatsappGroupLink}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
            />
          </div>

          {/* ===== ENROLLMENT QUESTIONS ===== */}
          <hr className="my-6 opacity-30" />

          <h2 className="text-xl font-bold text-amber-300">
            Enrollment Form Questions
          </h2>

          {formFields.map((f, i) => (
            <div key={i} className="border border-white/20 p-4 rounded-lg space-y-2">

              <input
                placeholder="Question"
                value={f.label}
                onChange={(e) => updateField(i, "label", e.target.value)}
                className="w-full px-3 py-2 rounded bg-white text-black"
              />

              {f.name && (
                <p className="text-xs text-blue-200">
                  System key: <i>{f.name}</i>
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
                  onChange={(e) => updateField(i, "required", e.target.checked)}
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

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-amber-300 text-blue-900 font-bold py-2 rounded-lg hover:bg-purple-400 transition mt-6"
          >
            {saving ? "Updating..." : "Update Course"}
          </button>

          <Link
            to="/admin/courses"
            className="block text-center text-amber-200 hover:text-white mt-3"
          >
            ← Back to Courses
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCoursePage;

