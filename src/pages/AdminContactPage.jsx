

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, Eye, Trash2, Mail, Reply } from "lucide-react";
import Loader from "../components/Loader";

const AdminContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [viewMsg, setViewMsg] = useState(null);
  const [replyMsg, setReplyMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  
  useEffect(() => {
    axios
      .get("/api/contact/messages")
      .then((res) => setMessages(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
       window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

 
  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/contact/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
      window.dispatchEvent(new Event("message-read"));
    } catch (err) {
      console.error(err);
    }
  };

  
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`/api/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      window.dispatchEvent(new Event("message-read"));
    } catch (err) {
      alert("Delete failed");
    }
  };

  
  const sendReply = async () => {
    if (!replyText.trim()) {
      alert("Reply cannot be empty");
      return;
    }

    setSending(true);
    try {
      await axios.post(`/api/contact/${replyMsg._id}/reply`, {
        message: replyText,
      });

      setMessages((prev) =>
        prev.map((m) =>
          m._id === replyMsg._id
            ? { ...m, read: true, replied: true }
            : m
        )
      );

      setReplyText("");
      setReplyMsg(null);
      alert("✅ Reply sent successfully");
    } catch (err) {
      alert("❌ Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  
  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q)
    );
  });

    if (loading) {
    return <Loader text="Contact Page..." />;
  }

  return (
    <div className="pt-[150px] pb-20 px-4 min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

      <motion.h1
        className="text-3xl font-extrabold text-center text-amber-300 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Messages
      </motion.h1>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto mb-8 flex gap-3 bg-white/10 px-4 py-2 rounded-xl">
        <Search className="text-amber-300" />
        <input
          className="bg-transparent w-full outline-none text-white"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-white/10 rounded-2xl p-6">
        {filtered.length === 0 ? (
          <p className="text-center text-blue-200">No messages found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((msg) => (
                <tr key={msg._id} className="border-b border-white/10">
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>

                  <td>
                    {msg.replied ? (
                      <span className="text-blue-400">Replied</span>
                    ) : msg.read ? (
                      <span className="text-green-400">Read</span>
                    ) : (
                      <span className="text-red-400">Unread</span>
                    )}
                  </td>

                  <td className="flex gap-3 justify-center py-2">
                    {!msg.read && (
                      <button
                        onClick={() => markAsRead(msg._id)}
                        className="text-green-400"
                      >
                        <Mail size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setViewMsg(msg);
                        if (!msg.read) markAsRead(msg._id);
                      }}
                      className="text-amber-300"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => setReplyMsg(msg)}
                      className="text-blue-400"
                    >
                      <Reply size={18} />
                    </button>

                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewMsg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-3">Message</h2>
            <p><b>Name:</b> {viewMsg.name}</p>
            <p><b>Email:</b> {viewMsg.email}</p>
            <p className="mt-3 whitespace-pre-line">{viewMsg.message}</p>

            <div className="text-right mt-4">
              <button
                onClick={() => setViewMsg(null)}
                className="px-4 py-2 bg-purple-700 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPLY MODAL */}
      {replyMsg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">Reply</h2>
            <p className="text-sm mb-2">
              To: <b>{replyMsg.email}</b>
            </p>

            <textarea
              rows={5}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Type your reply..."
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setReplyMsg(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                disabled={sending}
                onClick={sendReply}
                className="px-4 py-2 bg-purple-700 text-white rounded"
              >
                {sending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminContactPage;
