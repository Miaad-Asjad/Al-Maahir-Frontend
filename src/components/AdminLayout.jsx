

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useRef,
// } from "react";
// import { Outlet, Link } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import axios from "axios";
// import { io as clientIo } from "socket.io-client";
// import { Bell, Mail, Menu } from "lucide-react";

// /* ======================================================
//    NOTIFICATION CONTEXT
// ====================================================== */
// const NotificationContext = createContext();
// export function useNotifications() {
//   return useContext(NotificationContext);
// }

// const socketUrl = import.meta.env.VITE_API_URL;


// /* ======================================================
//    ADMIN LAYOUT
// ====================================================== */
// export default function AdminLayout({ children }) {
//   const [open, setOpen] = useState(false);
//   const [counts, setCounts] = useState({
//     enrollments: 0, // 🔥 pending only
//     messages: 0,    // 🔥 unread only
//   });
//   const [toasts, setToasts] = useState([]);
//   const socketRef = useRef(null);

//   /* ---------- Toast ID ---------- */
//   const nextId = (() => {
//     let i = 1;
//     return () => ++i;
//   })();

//   /* ---------- Sound ---------- */
//   const playBeep = () => {
//     try {
//       const ctx = new (window.AudioContext || window.webkitAudioContext)();
//       const osc = ctx.createOscillator();
//       const gain = ctx.createGain();
//       osc.frequency.value = 900;
//       gain.gain.value = 0.08;
//       osc.connect(gain);
//       gain.connect(ctx.destination);
//       osc.start();
//       setTimeout(() => {
//         osc.stop();
//         ctx.close();
//       }, 120);
//     } catch {}
//   };

//   /* ---------- Toast ---------- */
//   const pushToast = ({ title, body, type }) => {
//     const id = nextId();
//     playBeep();
//     setToasts((t) => [{ id, title, body, type }, ...t]);

//     setTimeout(() => {
//       setToasts((t) => t.filter((x) => x.id !== id));
//     }, 4500);
//   };

//   const removeToast = (id) =>
//     setToasts((t) => t.filter((x) => x.id !== id));

//   /* ======================================================
//      INITIAL LOAD (🔥 PENDING + UNREAD)
//   ====================================================== */
//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/enroll/all").catch(() => ({ data: [] })),
//       axios.get("/api/contact/messages").catch(() => ({ data: [] })),
//     ]).then(([enr, msg]) => {
//       const pendingEnrollments = (enr.data || []).filter(
//         (e) => e.status === "pending"
//       );

//       const unreadMessages = (msg.data || []).filter(
//         (m) => !m.read
//       );

//       setCounts({
//         enrollments: pendingEnrollments.length,
//         messages: unreadMessages.length,
//       });
//     });
//   }, []);

//   /* ======================================================
//      SOCKET.IO EVENTS
//   ====================================================== */
//   useEffect(() => {
//     const socket = clientIo(socketUrl, {
//   transports: ["websocket"],
//   withCredentials: true,
// });

//     socketRef.current = socket;

//     /* 🔔 NEW ENROLLMENT (always pending) */
//     socket.on("new-enrollment", (data) => {
//       setCounts((c) => ({
//         ...c,
//         enrollments: c.enrollments + 1,
//       }));

//       pushToast({
//         title: "New Enrollment",
//         body: `${data.student} — ${data.course}`,
//         type: "enrollment",
//       });
//     });

//     /* ✉️ NEW MESSAGE */
//     socket.on("new-message", (data) => {
//       setCounts((c) => ({
//         ...c,
//         messages: c.messages + 1,
//       }));

//       pushToast({
//         title: "New Message",
//         body: `${data.name}`,
//         type: "message",
//       });
//     });

//     /* 🔥 STATUS UPDATED (pending → accepted/rejected/contacted) */
//     socket.on("enrollment-status-updated", ({ oldStatus, newStatus }) => {
//       if (oldStatus === "pending" && newStatus !== "pending") {
//         setCounts((c) => ({
//           ...c,
//           enrollments: c.enrollments > 0 ? c.enrollments - 1 : 0,
//         }));
//       }
//     });

//     return () => socket.disconnect();
//   }, []);

//   /* ======================================================
//      🔔 SYNC FROM AdminContactPage (READ / DELETE)
//   ====================================================== */
//   useEffect(() => {
//     const handleMessageRead = () => {
//       setCounts((c) => ({
//         ...c,
//         messages: c.messages > 0 ? c.messages - 1 : 0,
//       }));
//     };

//     window.addEventListener("message-read", handleMessageRead);

//     return () => {
//       window.removeEventListener("message-read", handleMessageRead);
//     };
//   }, []);

//   const ctxValue = { counts, pushToast, removeToast, setCounts };

//   /* ======================================================
//      UI
//   ====================================================== */
//   return (
//     <NotificationContext.Provider value={ctxValue}>
//       <div className="min-h-screen flex bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

//         {/* ================= SIDEBAR ================= */}
//         <div
//           className={`
//             fixed md:relative top-0 left-0 h-full z-50
//             transition-all duration-300
//             ${open ? "w-64" : "w-0 md:w-20"}
//           `}
//         >
//           <AdminSidebar open={open} setOpen={setOpen} />
//         </div>

//         {/* ================= MAIN ================= */}
//         <div className="flex-1 flex flex-col">

//           {/* ---------- TOP BAR ---------- */}
//           <header className="sticky top-0 z-40 bg-blue-950/80 backdrop-blur-xl border-b border-purple-700/40">
//             <div className="flex items-center justify-between px-4 py-3">

//               {/* Left */}
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setOpen(!open)}
//                   className="md:hidden p-2 rounded-lg bg-white/10"
//                 >
//                   <Menu size={22} />
//                 </button>

//                 <h1 className="text-lg font-bold text-amber-300 hidden sm:block">
//                   Admin Panel
//                 </h1>
//               </div>

//               {/* Right */}
//               <div className="flex items-center gap-4">
//                 <Link to="/admin/messages" className="relative">
//                   <Mail size={22} />
//                   {counts.messages > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1.5 py-0.5 rounded-full">
//                       {counts.messages}
//                     </span>
//                   )}
//                 </Link>

//                 <Link to="/admin/enrollments" className="relative">
//                   <Bell size={22} />
//                   {counts.enrollments > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
//                       {counts.enrollments}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//             </div>
//           </header>

//           {/* ---------- CONTENT ---------- */}
//           <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
//             {children || <Outlet />}
//           </main>
//         </div>

//         {/* ================= TOASTS ================= */}
//         <div className="fixed bottom-6 right-4 z-[999] space-y-3 w-full max-w-xs">
//           {toasts.map((t) => (
//             <div
//               key={t.id}
//               className={`bg-white text-gray-900 rounded-lg shadow-lg p-3 border-l-4
//                 ${
//                   t.type === "enrollment"
//                     ? "border-amber-400"
//                     : "border-blue-500"
//                 }
//               `}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="font-bold">{t.title}</div>
//                   <div className="text-sm mt-1 text-gray-700">{t.body}</div>
//                 </div>
//                 <button
//                   onClick={() => removeToast(t.id)}
//                   className="ml-2 text-xl leading-none"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </NotificationContext.Provider>
//   );
// }



import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Outlet, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { io as clientIo } from "socket.io-client";
import { Bell, Mail, Menu } from "lucide-react";




  //  NOTIFICATION CONTEXT

const NotificationContext = createContext();
export function useNotifications() {
  return useContext(NotificationContext);
}

const socketUrl = import.meta.env.VITE_API_URL;

/* ======================================================
   ADMIN LAYOUT
====================================================== */
export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState({
    enrollments: 0,
    messages: 0,
  });
  const [toasts, setToasts] = useState([]);
  const socketRef = useRef(null);

  /* ---------- Toast ID ---------- */
  const nextId = (() => {
    let i = 1;
    return () => ++i;
  })();

  /* ---------- Sound ---------- */
  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 900;
      gain.gain.value = 0.08;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 120);
    } catch {}
  };

  /* ---------- Toast ---------- */
  const pushToast = ({ title, body, type }) => {
    const id = nextId();
    playBeep();
    setToasts((t) => [{ id, title, body, type }, ...t]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4500);
  };

  const removeToast = (id) =>
    setToasts((t) => t.filter((x) => x.id !== id));

  /* ======================================================
     INITIAL LOAD (pending + unread)
  ====================================================== */
  useEffect(() => {
    Promise.all([
      axios.get("/api/enroll/all").catch(() => ({ data: [] })),
      axios.get("/api/contact/messages").catch(() => ({ data: [] })),
    ]).then(([enr, msg]) => {
      const pendingEnrollments = (enr.data || []).filter(
        (e) => e.status === "pending"
      );
      const unreadMessages = (msg.data || []).filter((m) => !m.read);

      setCounts({
        enrollments: pendingEnrollments.length,
        messages: unreadMessages.length,
      });
    });
  }, []);

  /* ======================================================
     SOCKET.IO
  ====================================================== */
  useEffect(() => {
    const socket = clientIo(socketUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("new-enrollment", (data) => {
      setCounts((c) => ({
        ...c,
        enrollments: c.enrollments + 1,
      }));

      pushToast({
        title: "New Enrollment",
        body: `${data.student} — ${data.course}`,
        type: "enrollment",
      });
    });

    socket.on("new-message", (data) => {
      setCounts((c) => ({
        ...c,
        messages: c.messages + 1,
      }));

      pushToast({
        title: "New Message",
        body: `${data.name}`,
        type: "message",
      });
    });

    socket.on("enrollment-status-updated", ({ oldStatus, newStatus }) => {
      if (oldStatus === "pending" && newStatus !== "pending") {
        setCounts((c) => ({
          ...c,
          enrollments: Math.max(c.enrollments - 1, 0),
        }));
      }
    });

    return () => socket.disconnect();
  }, []);

  /* ======================================================
     MESSAGE READ SYNC
  ====================================================== */
  useEffect(() => {
    const handleMessageRead = () => {
      setCounts((c) => ({
        ...c,
        messages: Math.max(c.messages - 1, 0),
      }));
    };

    window.addEventListener("message-read", handleMessageRead);
    return () =>
      window.removeEventListener("message-read", handleMessageRead);
  }, []);

  const ctxValue = { counts, pushToast, removeToast, setCounts };

  /* ======================================================
     UI
  ====================================================== */
  return (
    <NotificationContext.Provider value={ctxValue}>
      <div className="min-h-screen flex bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

        {/* SIDEBAR */}
        <div
          className={`fixed md:relative top-0 left-0 h-full z-50 transition-all duration-300
            ${open ? "w-64" : "w-0 md:w-20"}`}
        >
          <AdminSidebar open={open} setOpen={setOpen} />
        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 bg-blue-950/80 backdrop-blur-xl border-b border-purple-700/40">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpen(!open)}
                  className="md:hidden p-2 rounded-lg bg-white/10"
                >
                  <Menu size={22} />
                </button>
                <h1 className="text-lg font-bold text-amber-300 hidden sm:block">
                  Admin Panel
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/admin/messages" className="relative">
                  <Mail size={22} />
                  {counts.messages > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1.5 py-0.5 rounded-full">
                      {counts.messages}
                    </span>
                  )}
                </Link>

                <Link to="/admin/enrollments" className="relative">
                  <Bell size={22} />
                  {counts.enrollments > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {counts.enrollments}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            {children || <Outlet />}
          </main>
        </div>

        {/* TOASTS */}
        <div className="fixed bottom-6 right-4 z-[999] space-y-3 w-full max-w-xs">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`bg-white text-gray-900 rounded-lg shadow-lg p-3 border-l-4 ${
                t.type === "enrollment"
                  ? "border-amber-400"
                  : "border-blue-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{t.title}</div>
                  <div className="text-sm mt-1 text-gray-700">{t.body}</div>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="ml-2 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </NotificationContext.Provider>
  );
}
