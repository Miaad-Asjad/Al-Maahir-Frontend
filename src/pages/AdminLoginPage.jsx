
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setBusy(true); setError("");
//     try {
//       const res = axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
//   email,
//   password
// });

//       const { token, admin } = res.data;
//       // store token and admin info
//       localStorage.setItem("adminToken", token);
//       localStorage.setItem("adminInfo", JSON.stringify(admin));
//       // set axios default header for subsequent requests
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       // navigate to admin dashboard
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-extrabold text-center text-purple-700 mb-4">Admin Login</h2>

//         {error && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">{error}</div>}

//         <form onSubmit={submit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               className="w-full border rounded px-3 py-2 mt-1"
//               type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               className="w-full border rounded px-3 py-2 mt-1"
//               type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={busy}
//             className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
//           >
//             {busy ? "Signing in..." : "Sign in"}
//           </button>
//         </form>

//         <p className="text-xs text-gray-500 mt-4 text-center">
//           Use admin email & password to login.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;




import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
     const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/admin/login`,
  { email, password }
);
      const { token, admin } = res.data;

      // Save admin token + info
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminInfo", JSON.stringify(admin));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirect
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-center text-purple-700 mb-4">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1 bg-white text-black"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1 bg-white text-black"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Use admin email & password to login.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
