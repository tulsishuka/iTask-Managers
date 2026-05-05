import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Monthly Draw 🎲",
    desc: "Participate in monthly draws by submitting your numbers (1–45).",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Prize Pool 💰",
    desc: "Win rewards based on matches. Jackpot winners earn the highest prize.",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: 3,
    title: "Winning System 🏆",
    desc: "Match 3, 4, or 5 numbers to win rewards.",
    color: "from-emerald-400 to-green-500",
  },
  {
    id: 4,
    title: "Charity Impact ❤️",
    desc: "A portion of every entry goes directly to real-world charities.",
    color: "from-teal-400 to-emerald-500",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#050B3E] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-green-500 "
          >
            How It Works 
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          >
            Simple, transparent and impactful experience designed for everyone.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
            
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 blur-2xl transition`}
              ></div>
              <div className="relative z-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl transition-all flex flex-col h-full">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center font-bold text-white shadow-lg`}
                >
                  {card.id}
                </div>

                <h2 className="text-xl font-bold mt-6 mb-3 group-hover:text-white">
                  {card.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-auto pt-6">
                  <div
                    className={`h-1 w-14 rounded-full bg-gradient-to-r ${card.color} opacity-70`}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;