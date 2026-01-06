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

  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  /* ================= SCROLL + FETCH COURSE ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      setCourse(null);

      // 🔴 Internet check
      if (!navigator.onLine) {
        setError("Internet connection failed. Please check your network.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/courses/${slug}`);
        const c = res.data;
        setCourse(c);

        // init fields
        const init = { name: "", email: "" };
        (c.formFields || []).forEach((f) => {
          init[f.name] = "";
        });
        setFormValues(init);
      } catch (err) {
        if (err?.response?.status === 404) {
          setError("The requested course could not be found.");
        } else {
          setError("Unable to load enrollment form. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  /* ================= LOADING ================= */
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

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            ⚠️ Oops!
          </h2>
          <p className="text-gray-700">{error}</p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              Retry
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="px-5 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 transition"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) return null;

  const fields = course.formFields || [];

  /* ================= CHANGE HANDLER ================= */
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");

    // 🔴 Internet check
    if (!navigator.onLine) {
      setStatusMsg("Internet connection failed. Please try again.");
      setSubmitting(false);
      return;
    }

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

      await axios.post("/api/enroll", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusMsg(
        "✅ Your enrollment request has been submitted successfully. Our team will contact you soon."
      );

      setTimeout(() => navigate("/"), 2500);
    } catch {
      setStatusMsg(
        "❌ Unable to submit your enrollment at the moment. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div
      className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen
      bg-gradient-to-b from-white via-purple-50 to-purple-100"
    >
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
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-gray-700"
                    >
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

          {/* STATUS */}
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
