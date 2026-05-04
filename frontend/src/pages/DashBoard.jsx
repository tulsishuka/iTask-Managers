/* eslint-disable react-hooks/set-state-in-effect */
// import React, { useEffect, useState } from "react";
// import { getDashboardData } from "../services/api";
// import Score from "../components/Score";

// const DashBoard = () => {
//   const [data, setData] = useState(null);

//   // FETCH DASHBOARD
//   const fetchDashboard = async () => {
//     try {
//       const res = await getDashboardData();
//       setData(res.data.data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load dashboard");
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchDashboard();
//   }, []);

//   if (!data) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

//       <div className="grid grid-cols-2 gap-6">

//         {/* Subscription */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Subscription Status</h2>
//           <p className="text-green-600 mt-2 capitalize">
//             {data.subscriptionStatus}
//           </p>
//         </div>

//         {/* Renewal */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Next Renewal</h2>
//           <p className="mt-2">
//             {data.subscriptionEnd
//               ? new Date(data.subscriptionEnd).toLocaleDateString()
//               : "N/A"}
//           </p>
//         </div>

//         {/* Charity */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Selected Charity ❤️</h2>
//           <p className="mt-2">{data.charity}</p>
         
//         </div>

//         {/* Contribution */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Contribution %</h2>
//           <p className="mt-2">{data.contribution}%</p>
//         </div>

//         {/* Winnings */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Total Winnings 💰</h2>
//           <p className="mt-2">₹ {data.winnings}</p>
//         </div>

//         {/* Draw */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Draw Participation 🎯</h2>
//           <p className="mt-2">{data.drawStatus}</p>
//         </div>

//       </div>

//       <Score />
//     </div>
//   );
// };

// export default DashBoard;







import React, { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";
import Score from "../components/Score";

const DashBoard = () => {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050B3E] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B3E] via-[#0A1A6A] to-[#0B3D91] text-white p-6 md:p-10">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
        Dashboard 
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Subscription */}
        <div className=" backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold">Subscription Status</h2>
          <p className="mt-2 text-green-300 capitalize">
            {data.subscriptionStatus}
          </p>
        </div>

        {/* Renewal */}
        <div className=" backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold">Next Renewal</h2>
          <p className="mt-2 text-gray-200">
            {data.subscriptionEnd
              ? new Date(data.subscriptionEnd).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Charity */}
        <div className="backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold">Selected Charity ❤️</h2>
          <p className="mt-2 text-cyan-300">{data.charity}</p>
        </div>

        {/* Contribution */}
        <div className="backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold">Contribution %</h2>
          <p className="mt-2 text-blue-300">{data.contribution}%</p>
        </div>

        {/* Winnings */}
        <div className=" backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold">Total Winnings 💰</h2>
          <p className="mt-2 text-emerald-300">₹ {data.winnings}</p>
        </div>

        {/* Draw */}
        <div className=" backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold">Draw Participation 🎯</h2>
          <p className="mt-2 text-yellow-300">{data.drawStatus}</p>
        </div>

      </div>

      {/* SCORE SECTION */}
      <div className="mt-10">
        <Score />
      </div>

    </div>
  );
};

export default DashBoard;