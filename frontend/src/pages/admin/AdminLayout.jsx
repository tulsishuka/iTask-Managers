
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Scores", path: "/admin/scores" },
    { name: "Draw", path: "/admin/draw" },
    { name: "Charities", path: "/admin/charities" },
    { name: "Winners", path: "/admin/winnerverification" },
  ];

  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5] flex flex-col lg:flex-row">

      <aside className="hidden lg:flex w-64 bg-[#131915] border-r border-[#1f2923] p-6 flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-emerald-400">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Management Console
          </p>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-[#22c55e]/20 text-emerald-400 border border-emerald-500/20"
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#171d19]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-emerald-400" : "bg-gray-600"
                    }`}
                  />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#131915] border-b border-[#1f2923] px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-emerald-400">
            Admin Panel
          </h1>
          <p className="text-[11px] text-gray-500">
            Management Console
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-[#1a211d] border border-[#26302a] flex items-center justify-center">
          <span className="text-emerald-400 text-sm">⚡</span>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">

        <div className="p-4 sm:p-6 lg:p-8 mt-20 lg:mt-0">
          <div className="bg-[#111613] border border-[#1b231e] rounded-3xl shadow-xl min-h-[90vh] overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#131915] border-t border-[#1f2923] flex justify-around py-2 z-50">
        {menu.slice(0, 4).map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <div
                className={`flex flex-col items-center text-xs py-1
                ${
                  isActive ? "text-emerald-400" : "text-gray-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mb-1 ${
                    isActive ? "bg-emerald-400" : "bg-gray-600"
                  }`}
                />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLayout;