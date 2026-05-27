

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/user" },
    { name: "Score Entry", path: "/user/scores" },
    { name: "Charities", path: "/user/charities" },
    { name: "Results", path: "/user/results" },
  ];

  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5] flex flex-col lg:flex-row">

      <aside className="hidden lg:flex w-64 bg-[#131915] border-r border-[#1f2923] p-6 flex-col">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <div
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                ${
                  location.pathname === item.path
                    ? "bg-[#22c55e]/20 text-emerald-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    location.pathname === item.path
                      ? "bg-emerald-400"
                      : "bg-gray-500"
                  }`}
                />
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0 p-4">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#131915] border-t border-[#1f2923] flex justify-around py-2 z-50">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="flex-1">
            <div
              className={`flex flex-col items-center text-xs py-1
              ${
                location.pathname === item.path
                  ? "text-emerald-400"
                  : "text-gray-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mb-1 ${
                  location.pathname === item.path
                    ? "bg-emerald-400"
                    : "bg-gray-500"
                }`}
              />
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserLayout;