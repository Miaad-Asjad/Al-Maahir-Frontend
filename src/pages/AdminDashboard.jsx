

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   BookOpen,
//   Users,
//   FileText,
//   CalendarCheck,
//   FolderOpen,
//   Mail,
// } from "lucide-react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:2000", {
//   transports: ["websocket"],
// });

// const AdminDashboard = () => {
//   const [messageCount, setMessageCount] = useState(0);
//   const [pendingEnrollmentCount, setPendingEnrollmentCount] = useState(0);

//   /* =====================================================
//      INITIAL LOAD
//   ===================================================== */
//   useEffect(() => {
//     // 🔥 UNREAD CONTACT MESSAGES ONLY
//     axios.get("/api/contact/messages").then((res) => {
//       const unread = res.data.filter((m) => !m.read);
//       setMessageCount(unread.length);
//     });

//     // 🔥 PENDING ENROLLMENTS ONLY
//     axios.get("/api/enroll/all").then((res) => {
//       const pendingOnly = res.data.filter(
//         (e) => e.status === "pending"
//       );
//       setPendingEnrollmentCount(pendingOnly.length);
//     });
//   }, []);

//   /* =====================================================
//      SOCKET EVENTS
//   ===================================================== */
//   useEffect(() => {
//     socket.on("new-enrollment", (data) => {
//       setPendingEnrollmentCount((p) => p + 1);
//       playNotificationSound();
//       showToast(`New enrollment: ${data.student}`);
//     });

//     socket.on("new-message", (data) => {
//       setMessageCount((p) => p + 1);
//       playNotificationSound();
//       showToast(`New message from ${data.name}`);
//     });

//     return () => {
//       socket.off("new-enrollment");
//       socket.off("new-message");
//     };
//   }, []);

//   /* =====================================================
//      🔔 SYNC WITH AdminContactPage
//   ===================================================== */
//   useEffect(() => {
//     const handleMessageRead = () => {
//       setMessageCount((p) => (p > 0 ? p - 1 : 0));
//     };

//     window.addEventListener("message-read", handleMessageRead);
//     return () =>
//       window.removeEventListener("message-read", handleMessageRead);
//   }, []);

//   /* =====================================================
//      SOUND + TOAST
//   ===================================================== */
//   const playNotificationSound = () => {
//     const audio = new Audio("/notification.mp3");
//     audio.play();
//   };

//   const showToast = (text) => {
//     const div = document.createElement("div");
//     div.className =
//       "fixed top-5 right-5 bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg z-50";
//     div.innerText = text;
//     document.body.appendChild(div);

//     setTimeout(() => {
//       div.style.opacity = "0";
//       div.style.transition = "0.6s";
//     }, 2500);

//     setTimeout(() => div.remove(), 3000);
//   };

//   /* =====================================================
//      DASHBOARD CARDS
//   ===================================================== */
//   const cards = [
//     {
//       title: "Manage Courses",
//       desc: "Add, edit or delete courses.",
//       icon: <BookOpen className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
//       link: "/admin/courses",
//     },
//     {
//       title: "Enrollments",
//       desc: `Pending requests: ${pendingEnrollmentCount}`,
//       icon: (
//         <div className="relative">
//           <Users className="text-amber-300 w-12 h-12 mx-auto mb-4" />
//           {pendingEnrollmentCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs px-2 py-1 rounded-full font-bold">
//               {pendingEnrollmentCount}
//             </span>
//           )}
//         </div>
//       ),
//       link: "/admin/enrollments",
//     },
//     {
//       title: "Resources",
//       desc: "Upload PDFs, Videos & Notes.",
//       icon: <FolderOpen className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
//       link: "/admin/resources",
//     },
//     {
//       title: "Academic Calendar",
//       desc: "Manage events & schedules.",
//       icon: <CalendarCheck className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
//       link: "/admin/calendar",
//     },
//     {
//       title: "Testimonials",
//       desc: "Manage student feedback.",
//       icon: <FileText className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
//       link: "/admin/testimonials",
//     },
//     {
//       title: "Contact Messages",
//       desc: `Unread messages: ${messageCount}`,
//       icon: (
//         <div className="relative">
//           <Mail className="text-amber-300 w-12 h-12 mx-auto mb-4" />
//           {messageCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//               {messageCount}
//             </span>
//           )}
//         </div>
//       ),
//       link: "/admin/messages",
//     },
//   ];

//   return (
//     <div className="pt-8 pb-16">
//       <motion.h1
//         className="text-4xl font-extrabold text-center text-amber-300 mb-14"
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Admin Dashboard
//       </motion.h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
//         {cards.map((card, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ scale: 1.04 }}
//             className="bg-gradient-to-b from-blue-900/70 to-purple-900/70 border border-amber-400/30 shadow-xl rounded-2xl p-7 text-center flex flex-col"
//           >
//             {card.icon}
//             <h3 className="text-xl font-semibold mb-2 text-amber-300">
//               {card.title}
//             </h3>
//             <p className="text-blue-100 text-sm mb-4">{card.desc}</p>
//             <Link
//               to={card.link}
//               className="inline-block bg-amber-300 text-blue-900 mt-auto px-5 py-2 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition"
//             >
//               Open →
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  FileText,
  CalendarCheck,
  FolderOpen,
  Mail,
} from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

/* 🔥 SOCKET URL FROM ENV */
const SOCKET_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [pendingEnrollmentCount, setPendingEnrollmentCount] = useState(0);
  const socketRef = useRef(null);

  /* =====================================================
     INITIAL LOAD
  ===================================================== */
  useEffect(() => {
    axios.get("/api/contact/messages").then((res) => {
      const unread = (res.data || []).filter((m) => !m.read);
      setMessageCount(unread.length);
    });

    axios.get("/api/enroll/all").then((res) => {
      const pendingOnly = (res.data || []).filter(
        (e) => e.status === "pending"
      );
      setPendingEnrollmentCount(pendingOnly.length);
    });
  }, []);

  /* =====================================================
     SOCKET EVENTS  ✅ FIXED
  ===================================================== */
  useEffect(() => {
    if (!SOCKET_URL) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      path: "/socket.io",
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("new-enrollment", (data) => {
      setPendingEnrollmentCount((p) => p + 1);
      playNotificationSound();
      showToast(`New enrollment: ${data.student}`);
    });

    socket.on("new-message", (data) => {
      setMessageCount((p) => p + 1);
      playNotificationSound();
      showToast(`New message from ${data.name}`);
    });

    return () => socket.disconnect();
  }, []);

  /* =====================================================
     🔔 SYNC WITH AdminContactPage
  ===================================================== */
  useEffect(() => {
    const handleMessageRead = () => {
      setMessageCount((p) => (p > 0 ? p - 1 : 0));
    };

    window.addEventListener("message-read", handleMessageRead);
    return () =>
      window.removeEventListener("message-read", handleMessageRead);
  }, []);

  /* =====================================================
     SOUND + TOAST (UNCHANGED)
  ===================================================== */
  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  const showToast = (text) => {
    const div = document.createElement("div");
    div.className =
      "fixed top-5 right-5 bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    div.innerText = text;
    document.body.appendChild(div);

    setTimeout(() => {
      div.style.opacity = "0";
      div.style.transition = "0.6s";
    }, 2500);

    setTimeout(() => div.remove(), 3000);
  };

  /* =====================================================
     DASHBOARD CARDS (UNCHANGED)
  ===================================================== */
  const cards = [
    {
      title: "Manage Courses",
      desc: "Add, edit or delete courses.",
      icon: <BookOpen className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
      link: "/admin/courses",
    },
    {
      title: "Enrollments",
      desc: `Pending requests: ${pendingEnrollmentCount}`,
      icon: (
        <div className="relative">
          <Users className="text-amber-300 w-12 h-12 mx-auto mb-4" />
          {pendingEnrollmentCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs px-2 py-1 rounded-full font-bold">
              {pendingEnrollmentCount}
            </span>
          )}
        </div>
      ),
      link: "/admin/enrollments",
    },
    {
      title: "Resources",
      desc: "Upload PDFs, Videos & Notes.",
      icon: <FolderOpen className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
      link: "/admin/resources",
    },
    {
      title: "Academic Calendar",
      desc: "Manage events & schedules.",
      icon: <CalendarCheck className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
      link: "/admin/calendar",
    },
    {
      title: "Testimonials",
      desc: "Manage student feedback.",
      icon: <FileText className="text-amber-300 w-12 h-12 mx-auto mb-4" />,
      link: "/admin/testimonials",
    },
    {
      title: "Contact Messages",
      desc: `Unread messages: ${messageCount}`,
      icon: (
        <div className="relative">
          <Mail className="text-amber-300 w-12 h-12 mx-auto mb-4" />
          {messageCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {messageCount}
            </span>
          )}
        </div>
      ),
      link: "/admin/messages",
    },
  ];

  return (
    <div className="pt-8 pb-16">
      <motion.h1
        className="text-4xl font-extrabold text-center text-amber-300 mb-14"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-b from-blue-900/70 to-purple-900/70 border border-amber-400/30 shadow-xl rounded-2xl p-7 text-center flex flex-col"
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-2 text-amber-300">
              {card.title}
            </h3>
            <p className="text-blue-100 text-sm mb-4">{card.desc}</p>
            <Link
              to={card.link}
              className="inline-block bg-amber-300 text-blue-900 mt-auto px-5 py-2 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition"
            >
              Open →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
