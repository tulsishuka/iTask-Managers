// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Charity = () => {
//   const [charities, setCharities] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const navigate = useNavigate();

//   // eslint-disable-next-line no-unused-vars
//   const token = localStorage.getItem("token");

//   // 🔥 FETCH CHARITIES
//   useEffect(() => {
//     const fetchCharities = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/charity");

//         console.log("CHARITIES:", res.data);

//         setCharities(res.data.data || []);
//       } catch (err) {
//         console.log("Fetch error:", err);
//       }
//     };

//     fetchCharities();
//   }, []);

//   // 👉 SELECT CHARITY
//   const handleSelect = (charity) => {
//     setSelected(charity);
//     setSaved(false);
//   };

// const saveCharity = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     console.log("🔐 TOKEN:", token);

//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     if (!selected) {
//       alert("Select a charity first");
//       return;
//     }

//     setLoading(true);

//     const res = await axios.post(
//       "http://localhost:5000/api/charity/select",
//       {
//         charityId: selected._id,
//         percentage: selected.percentage || 0,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ MUST BE EXACT
//         },
//       }
//     );

//     console.log("✅ SAVE RESPONSE:", res.data);

//     setSaved(true);
//     alert("Charity saved successfully ❤️");

//     setTimeout(() => {
//       navigate("/dashboard", { replace: true });
//     }, 500);

//   } catch (err) {
//     console.log("❌ Save error:", err.response?.data || err.message);
//     alert(err.response?.data?.message || "Failed to save charity");
//   } finally {
//     setLoading(false);
//   }
// };

// //   const saveCharity = async () => {
// //   try {
// //     if (!token) {
// //       alert("Please login first");
// //       return;
// //     }

// //     if (!selected) {
// //       alert("Select a charity first");
// //       return;
// //     }

// //     setLoading(true);

// //     const res = await axios.post(
// //       "http://localhost:5000/api/charity/select",
// //       {
// //         charityId: selected._id,
// //         percentage: selected.percentage,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );


// //     console.log("SAVE RESPONSE:", res.data);

// //     setSaved(true);
// //     alert(res.data.message || "Charity selected successfully ❤️");

// //     // ✅ 🔥 REDIRECT TO DASHBOARD
// //     setTimeout(() => {
// //       navigate("/Subscription", { replace: true });
// //     }, 500);

// //   } catch (err) {
// //     console.log("Save error:", err);
// //     alert("Failed to save charity");
// //   } finally {
// //     setLoading(false);
// //   }
// // };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Choose Your Charity ❤️
//       </h1>

//       {/* LIST */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {charities.length > 0 ? (
//           charities.map((c) => (
//             <div
//               key={c._id}
//               onClick={() => handleSelect(c)}
//               className={`p-5 border rounded-lg cursor-pointer transition
//               ${
//                 selected?._id === c._id
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-200 bg-white"
//               }`}
//             >
//               <h2 className="text-xl font-semibold">{c.name}</h2>

//               <p className="text-gray-600 mt-2">
//                 {c.description}
//               </p>

//               <p className="text-sm text-gray-500 mt-2">
//                 Contribution: {c.percentage}%
//               </p>

//               {selected?._id === c._id && (
//                 <p className="text-green-600 font-bold mt-2">
//                   Selected ✔
//                 </p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No charities available</p>
//         )}

//       </div>

//       {/* BUTTON */}
//       <div className="mt-6">
//         <button
//           onClick={saveCharity}
//           disabled={loading}
//           className="bg-black text-white px-6 py-2 rounded"
//         >
//           {loading ? "Saving..." : "Save Charity"}
//         </button>
//       </div>

//       {/* SUCCESS MESSAGE */}
//       {saved && (
//         <p className="mt-4 text-green-600 font-semibold">
//           ❤️ Charity saved successfully
//         </p>
//       )}

//     </div>
//   );
// };

// export default Charity;









import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Charity = () => {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const token = localStorage.getItem("token");

  // 🔥 FETCH CHARITIES
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/charity");
        console.log("CHARITIES:", res.data);
        setCharities(res.data.data || []);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchCharities();
  }, []);

  // 👉 SELECT CHARITY
  const handleSelect = (charity) => {
    setSelected(charity);
    setSaved(false);
  };

  const saveCharity = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      if (!selected) {
        alert("Select a charity first");
        return;
      }

      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        "http://localhost:5000/api/charity/select",
        {
          charityId: selected._id,
          percentage: selected.percentage || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(true);
      alert("Charity saved successfully ❤️");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 500);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save charity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B20] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Charity ❤️</h1>
          <p className="text-gray-400">Select a cause to support with your participation.</p>
        </div>

        {/* ALTERNATING LIST */}
        <div className="space-y-24">
          {charities.length > 0 ? (
            charities.map((c, index) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:items-center gap-10 md:gap-20 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Left/Right Image Side */}
                <div className="flex-1">
                  <div 
                    onClick={() => handleSelect(c)}
                    className={`relative group cursor-pointer overflow-hidden rounded-3xl border-4 transition-all duration-300 ${
                      selected?._id === c._id ? "border-green-500 scale-105" : "border-white/10"
                    }`}
                  >
                    <img 
                      src={c.image || `https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800`} 
                      alt={c.name}
                      className="w-full h-[300px] md:h-[400px] object-cover transition-transform group-hover:scale-110"
                    />
                    {selected?._id === c._id && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <span className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-xl">
                          SELECTED ✔
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right/Left Description Side */}
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">{c.name}</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {c.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                      Contribution: {c.percentage}%
                    </span>
                  </div>
                  <button
                    onClick={() => handleSelect(c)}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${
                      selected?._id === c._id 
                      ? "bg-green-500 text-white" 
                      : "bg-white/5 border border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {selected?._id === c._id ? "Selected Cause" : "Select this Charity"}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No charities available at the moment.</p>
            </div>
          )}
        </div>

        {/* FIXED FOOTER ACTION */}
        {selected && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase">Confirm Choice</p>
                <p className="font-bold truncate w-32">{selected.name}</p>
              </div>
              <button
                onClick={saveCharity}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Confirm & Save"}
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Charity;