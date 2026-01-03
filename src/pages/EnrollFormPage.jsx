import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EnrollFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [fileValue, setFileValue] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/courses/${slug}`)
      .then((res) => {
        const c = res.data;
        setCourse(c);

        // init fields
        const init = {};
        (c.formFields || []).forEach((f) => {
          init[f.name] = "";
        });
        init.name = "";
        init.email = "";

        setFormValues(init);
      })
      .catch(() => {
        setCourse(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  
  if (loading) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading enrollment form…</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600 font-semibold">
          The requested course could not be found.
        </p>
      </div>
    );
  }

  const fields = course.formFields || [];

 
  const handleChange = (e, field) => {
    if (field?.type === "file") {
      setFileValue(e.target.files[0] || null);
    } else {
      setFormValues((prev) => ({
        ...prev,
        [field ? field.name : e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");

    try {
      const fd = new FormData();

      fd.append("course", course._id);
      fd.append("courseName", course.title);
      fd.append("name", formValues.name || "");
      fd.append("email", formValues.email || "");

      const custom = { ...formValues };
      delete custom.name;
      delete custom.email;

      fd.append("customFields", JSON.stringify(custom));

      if (fileValue) fd.append("file", fileValue);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/enroll`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatusMsg(
        "Your enrollment request has been submitted successfully. Our team will contact you soon."
      );

      setTimeout(() => navigate("/"), 2500);
    } catch {
      setStatusMsg(
        "We were unable to submit your enrollment at the moment. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen
      bg-gradient-to-b from-white via-purple-50 to-purple-100">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Enroll — {course.title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formValues.name || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-black bg-white"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-black bg-white"
            />
          </div>

          {/* DYNAMIC FIELDS */}
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label} {f.required && "*"}
              </label>

              {(f.type === "text" ||
                f.type === "email" ||
                f.type === "number" ||
                f.type === "tel") && (
                <input
                  type={f.type}
                  value={formValues[f.name] || ""}
                  onChange={(e) => handleChange(e, f)}
                  required={f.required}
                  className="w-full border rounded px-3 py-2 text-black bg-white"
                />
              )}

              {f.type === "textarea" && (
                <textarea
                  rows={4}
                  value={formValues[f.name] || ""}
                  onChange={(e) => handleChange(e, f)}
                  required={f.required}
                  className="w-full border rounded px-3 py-2 text-black bg-white"
                />
              )}

              {f.type === "radio" && (
                <div className="flex gap-4">
                  {(f.options || []).map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name={f.name}
                        value={opt}
                        checked={formValues[f.name] === opt}
                        onChange={(e) => handleChange(e, f)}
                        required={f.required}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {f.type === "file" && (
                <input
                  type="file"
                  accept={f.accept || "*/*"}
                  onChange={(e) => handleChange(e, f)}
                  className="w-full text-black"
                />
              )}
            </div>
          ))}

          {/* STATUS MESSAGE */}
          {statusMsg && (
            <p className="text-center text-sm font-medium text-purple-700">
              {statusMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-700 text-white py-2 rounded-lg
              font-semibold hover:bg-purple-800 transition"
          >
            {submitting ? "Submitting…" : "Submit Enrollment"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EnrollFormPage;
