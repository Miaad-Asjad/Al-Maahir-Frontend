


import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaYoutube } from "react-icons/fa";
import Loader from "../components/Loader";
import { useEffect } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const submitForm = async (e) => {
  e.preventDefault();
  setLoading(true);
  setFeedback("");

  try {
    await axios.post("/api/contact", form);

    setFeedback(
      "Thank you for contacting us. Your message has been sent successfully. Our team will get back to you shortly."
    );

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (err) {
    setFeedback(
      "We were unable to send your message at the moment. Please try again later."
    );
  } finally {
    setLoading(false);
  }
};

if (loading) {
    return <Loader text="Contact..." />;
  }


  return (
    <div className="pt-[150px] pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white text-gray-800">
      
      {/* Page Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-center text-purple-900 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Us
      </motion.h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Contact Info */}
        <motion.div
          className="space-y-6 bg-gradient-to-b from-blue-900 to-purple-900 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold text-amber-300">Get in Touch</h2>
          <p className="text-sm sm:text-base leading-relaxed text-blue-100">
            If you have any questions about our courses, feel free to reach out.
            We're here to assist you!
          </p>

          <div>
            <p className="font-semibold text-purple-200">📧 Email:</p>
            <p className="text-sm text-blue-100">almaahiracademy@gmail.com</p>
          </div>


          <div>
            <p className="font-semibold text-purple-200">🌐 Socials:</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com/share/1B5wC6skwx/" target="_blank" className="text-amber-300 hover:text-white transition">
                <FaFacebookF size={20} />
              </a>
              <a href="https://www.instagram.com/almaahiracademy?igsh=ZXN0d2NleG51emhy" target="_blank" className="text-amber-300 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com/@almaahiracademy?si=MKBqRr_h1xODdIom" target="_blank" className="text-amber-300 hover:text-white transition">
                <FaYoutube size={20} />
              </a>
              <a href="https://wa.me/923335600182" target="_blank" className="text-amber-300 hover:text-white transition">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={submitForm}
          className="bg-gradient-to-b from-blue-900 to-purple-900 text-white p-6 rounded-2xl shadow-lg space-y-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-blue-950/50 text-white border border-purple-700 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-blue-950/50 text-white border border-purple-700 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-blue-950/50 text-white border border-purple-700 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-blue-950/50 text-white border border-purple-700 focus:border-amber-400 outline-none"
            />
          </div>

          {feedback && (
            <p className="text-center font-semibold mt-2">
              {feedback}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-300 hover:bg-purple-600 text-blue-950 hover:text-white font-semibold py-2 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
