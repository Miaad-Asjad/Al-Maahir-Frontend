




import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderOpen,
  CalendarCheck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Mail,
} from "lucide-react";
import axios from "axios";
import { useNotifications } from "./AdminLayout";

const AdminSidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { counts } = useNotifications();

  const links = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/courses", label: "Courses", icon: <BookOpen size={20} /> },
    { path: "/admin/enrollments", label: "Enrollments", icon: <Users size={20} />, badge: counts.enrollments },
    { path: "/admin/resources", label: "Resources", icon: <FolderOpen size={20} /> },
    { path: "/admin/calendar", label: "Calendar", icon: <CalendarCheck size={20} /> },
    { path: "/admin/testimonials", label: "Testimonials", icon: <MessageCircle size={20} /> },
    { path: "/admin/messages", label: "Messages", icon: <Mail size={20} />, badge: counts.messages },
  ];

  const logoutAdmin = () => {
    if (!window.confirm("Logout?")) return;
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/admin/login");
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-16 md:top-0
          left-0 z-40
          h-[calc(100vh-64px)] md:h-screen
          bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950
          border-r border-purple-700/40
          backdrop-blur-xl
          flex flex-col
          transition-all duration-300
          ${open ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0 md:w-20"}
        `}
      >
        {/* TOGGLE BUTTON (desktop only) */}
        <button
          onClick={() => setOpen(!open)}
          className="
            hidden md:flex
            absolute -right-4 top-6
            bg-amber-300 text-blue-900 hover:bg-purple-300
            p-2 rounded-full shadow-lg transition
          "
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* NAVIGATION */}
        <nav className="mt-8 px-3 flex flex-col gap-2 flex-grow">
          {links.map(({ path, label, icon, badge }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)} 
                className={`
                  flex items-center justify-between
                  px-3 py-2 rounded-lg transition
                  ${active
                    ? "bg-amber-300 text-blue-900 font-bold"
                    : "hover:bg-white/10 text-white"}
                `}
              >
                <div className="flex items-center gap-3">
                  {icon}
                  {open && <span className="whitespace-nowrap">{label}</span>}
                </div>

                {badge > 0 && open && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="px-3 pb-6">
          <button
            onClick={logoutAdmin}
            className="
              w-full flex items-center gap-3
              px-3 py-2 rounded-lg
              bg-red-600/80 hover:bg-red-700
              transition text-white font-semibold
            "
          >
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
