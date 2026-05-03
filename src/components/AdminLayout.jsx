

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



// /* CONTEXT  */
// const NotificationContext = createContext();
// export function useNotifications() {
//   return useContext(NotificationContext);
// }

// const socketUrl = import.meta.env.VITE_API_URL;

// export default function AdminLayout({ children }) {
//   const [open, setOpen] = useState(false);

//   const [counts, setCounts] = useState({
//     enrollments: 0,
//     messages: 0,
//   });

//   const [toasts, setToasts] = useState([]);

//   /*  NEW STATES */
//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const socketRef = useRef(null);

//   /* Sound  */
//   const playBeep = () => {
//     try {
//       const ctx = new (window.AudioContext || window.AudioContext)();
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

//   /* Toast  */
//   const nextId = (() => {
//     let i = 1;
//     return () => ++i;
//   })();

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

//   /*  INITIAL COUNTS- */
//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/enroll/all").catch(() => ({ data: [] })),
//       axios.get("/api/contact/messages").catch(() => ({ data: [] })),
//     ]).then(([enr, msg]) => {
//       const pendingEnrollments = (enr.data || []).filter(
//         (e) => e.status === "pending"
//       );
//       const unreadMessages = (msg.data || []).filter((m) => !m.read);

//       setCounts({
//         enrollments: pendingEnrollments.length,
//         messages: unreadMessages.length,
//       });
//     });
//   }, []);

//   /*  SOCKET  */
//   useEffect(() => {
//     const socket = clientIo(socketUrl, {
//       transports: ["websocket"],
//       withCredentials: true,
//     });

//     socketRef.current = socket;

//     /*  ENROLLMENT REALTIME */
//     socket.on("new-enrollment", (data) => {
//       setCounts((c) => ({
//         ...c,
//         enrollments: c.enrollments + 1,
//       }));

//       /*  ADD TO DROPDOWN */
//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           text: `${data.student} enrolled in ${data.course}`,
//         },
//         ...prev,
//       ]);

//       pushToast({
//         title: "New Enrollment",
//         body: `${data.student} — ${data.course}`,
//         type: "enrollment",
//       });
//     });

//     /*  MESSAGE REALTIME */
//     socket.on("new-message", (data) => {
//       setCounts((c) => ({
//         ...c,
//         messages: c.messages + 1,
//       }));

//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           text: `New message from ${data.name}`,
//         },
//         ...prev,
//       ]);

//       pushToast({
//         title: "New Message",
//         body: `${data.name}`,
//         type: "message",
//       });
//     });

//     socket.on("enrollment-status-updated", ({ oldStatus, newStatus }) => {
//       if (oldStatus === "pending" && newStatus !== "pending") {
//         setCounts((c) => ({
//           ...c,
//           enrollments: Math.max(c.enrollments - 1, 0),
//         }));
//       }
//     });

//     return () => socket.disconnect();
//   }, []);

//   /* ---------- MESSAGE READ ---------- */
//   useEffect(() => {
//     const handleMessageRead = () => {
//       setCounts((c) => ({
//         ...c,
//         messages: Math.max(c.messages - 1, 0),
//       }));
//     };

//     window.addEventListener("message-read", handleMessageRead);
//     return () =>
//       window.removeEventListener("message-read", handleMessageRead);
//   }, []);

//   const ctxValue = { counts, pushToast, removeToast, setCounts };

//   return (
//     <NotificationContext.Provider value={ctxValue}>
//       <div className="min-h-screen flex bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">

//         {/* SIDEBAR */}
//         <div
//           className={`fixed md:relative top-0 left-0 h-full z-50 transition-all duration-300
//             ${open ? "w-64" : "w-0 md:w-20"}`}
//         >
//           <AdminSidebar open={open} setOpen={setOpen} />
//         </div>

//         {/* MAIN */}
//         <div className="flex-1 flex flex-col">

//           {/* HEADER */}
//           <header className="sticky top-0 z-40 bg-blue-950/80 backdrop-blur-xl border-b border-purple-700/40">
//             <div className="flex items-center justify-between px-4 py-3">

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

//               {/* RIGHT SIDE */}
//               <div className="flex items-center gap-4">

//                 {/* MESSAGES */}
//                 <Link to="/admin/messages" className="relative">
//                   <Mail size={22} />
//                   {counts.messages > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1.5 py-0.5 rounded-full">
//                       {counts.messages}
//                     </span>
//                   )}
//                 </Link>

//                 {/*  NOTIFICATION BELL */}
//                 <div className="relative">
//                   <button onClick={() => setShowDropdown(!showDropdown)}>
//                     <Bell size={22} />
//                   </button>

//                   {counts.enrollments > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
//                       {counts.enrollments}
//                     </span>
//                   )}

//                   {/*  DROPDOWN */}
//                   {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
//                       <div className="p-3 border-b font-semibold">
//                         Notifications
//                       </div>

//                       {notifications.length > 0 ? (
//                         notifications.map((n) => (
//                           <div
//                             key={n.id}
//                             className="px-3 py-2 text-sm hover:bg-gray-100 border-b"
//                           >
//                             {n.text}
//                           </div>
//                         ))
//                       ) : (
//                         <div className="p-3 text-sm text-gray-500">
//                           No notifications
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* MAIN CONTENT */}
//           <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
//             {children || <Outlet />}
//           </main>
//         </div>

//         {/* TOASTS */}
//         <div className="fixed bottom-6 right-4 z-[999] space-y-3 w-full max-w-xs">
//           {toasts.map((t) => (
//             <div
//               key={t.id}
//               className={`bg-white text-gray-900 rounded-lg shadow-lg p-3 border-l-4 ${
//                 t.type === "enrollment"
//                   ? "border-amber-400"
//                   : "border-blue-500"
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="font-bold">{t.title}</div>
//                   <div className="text-sm mt-1 text-gray-700">{t.body}</div>
//                 </div>
//                 <button
//                   onClick={() => removeToast(t.id)}
//                   className="ml-2 text-xl"
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

/* CONTEXT  */
const NotificationContext = createContext();
export function useNotifications() {
  return useContext(NotificationContext);
}

const socketUrl = import.meta.env.VITE_API_URL;

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const [counts, setCounts] = useState({
    enrollments: 0,
    messages: 0,
  });

  const [toasts, setToasts] = useState([]);

  /* 🔥 FIXED STATE */
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const socketRef = useRef(null);

  /* Toast */
  const nextId = (() => {
    let i = 1;
    return () => ++i;
  })();

  const pushToast = ({ title, body, type }) => {
    const id = nextId();

    setToasts((t) => [{ id, title, body, type }, ...t]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4500);
  };

  const removeToast = (id) =>
    setToasts((t) => t.filter((x) => x.id !== id));

  /* INITIAL COUNTS */
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

  /* SOCKET */
  useEffect(() => {
    const socket = clientIo(socketUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    /* ✅ ENROLLMENT */
    socket.on("new-enrollment", (data) => {
      setCounts((c) => ({
        ...c,
        enrollments: c.enrollments + 1,
      }));

      /* 🔥 IMPORTANT FIX */
      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "enrollment",
          student: data.student,
          course: data.course,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      pushToast({
        title: "New Enrollment",
        body: `${data.student} — ${data.course}`,
        type: "enrollment",
      });
    });

    /* MESSAGE */
    socket.on("new-message", (data) => {
      setCounts((c) => ({
        ...c,
        messages: c.messages + 1,
      }));

      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "message",
          name: data.name,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      pushToast({
        title: "New Message",
        body: `${data.name}`,
        type: "message",
      });
    });

    return () => socket.disconnect();
  }, []);

  const ctxValue = { counts, pushToast, removeToast, setCounts };

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

        <div className="flex-1 flex flex-col">

          {/* HEADER */}
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

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                {/* MESSAGES */}
                <Link to="/admin/messages" className="relative">
                  <Mail size={22} />
                  {counts.messages > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1.5 py-0.5 rounded-full">
                      {counts.messages}
                    </span>
                  )}
                </Link>

                {/* 🔔 NOTIFICATION */}
                <div className="relative">
                  <button onClick={() => setShowDropdown(!showDropdown)}>
                    <Bell size={22} />
                  </button>

                  {counts.enrollments > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {counts.enrollments}
                    </span>
                  )}

                  {/* ✅ FINAL DROPDOWN FIX */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

                      <div className="p-3 border-b font-semibold">
                        Notifications
                      </div>

                      {notifications.length === 0 ? (
                        <div className="p-3 text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="px-4 py-3 border-b hover:bg-gray-100"
                          >
                            {n.type === "enrollment" ? (
                              <>
                                <p className="text-sm">
                                  <span className="font-semibold text-purple-700">
                                    {n.student}
                                  </span>{" "}
                                  enrolled in{" "}
                                  <span className="font-bold text-amber-600">
                                    {n.course}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {n.time}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-sm">
                                  New message from{" "}
                                  <span className="font-semibold text-blue-600">
                                    {n.name}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {n.time}
                                </p>
                              </>
                            )}
                          </div>
                        ))
                      )}

                    </div>
                  )}
                </div>

              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6">
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
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{t.title}</div>
                  <div className="text-sm mt-1">{t.body}</div>
                </div>
                <button onClick={() => removeToast(t.id)}>×</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </NotificationContext.Provider>
  );
}