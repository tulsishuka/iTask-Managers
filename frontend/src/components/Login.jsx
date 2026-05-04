
// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post(
//       "http://127.0.0.1:5000/api/v1/auth/login",
//       formData
//     );

//     console.log("LOGIN RESPONSE:", res.data);

//     const { token, subscriptionStatus, user } = res.data;

//     // ✅ Save token + user
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Login successful");

//     // 🔥 ROLE BASED REDIRECT (FIRST PRIORITY)
//     if (user?.role === "admin") {
//   navigate("/admin");
//   return;
// }

//     // 👇 normal user flow
//     if (subscriptionStatus === "active") {
//       navigate("/Dashboard");
//     } else {
//       navigate("/Subscription");
//     }

//   } catch (error) {
//     alert(error.response?.data?.message || "Login failed");
//   }
// };


  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-md p-8 shadow-md rounded">

//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border-b p-2 outline-none"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border-b p-2 outline-none"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-[#DB4444] text-white py-3 rounded"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center mt-6 text-sm">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-[#DB4444] font-medium hover:underline">
//             Sign Up
//           </Link>
//         </p>

//         <p className="text-center mt-6 text-sm">
//           <Link to="/forgot" className="text-[#DB4444] font-medium hover:underline">
//             Forgot Password
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Login;






import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/v1/auth/login",
        formData
      );

      const { token, subscriptionStatus, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      if (user?.role === "admin") {
        navigate("/admin");
        return;
      }

      if (subscriptionStatus === "active") {
        navigate("/Dashboard");
      } else {
        navigate("/Subscription");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050B3E] via-[#0A1A6A] to-[#0B3D91] px-4">

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
          Login Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-300 space-y-2">

          <p>
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-300 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>

          <p>
            <Link
              to="/forgot"
              className="text-blue-300 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;