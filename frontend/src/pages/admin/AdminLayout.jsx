import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Scores", path: "/admin/scores" },
    { name: "Draw", path: "/admin/draw" },
    { name: "Charities", path: "/admin/charities" },
    { name: "Winners", path: "/admin/winners" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 hidden md:flex flex-col bg-[#050B3E] text-white p-6">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Panel
        </h1>
        <nav className="space-y-2">

          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition font-medium
                  ${
                    isActive
                      ? "bg-white text-[#050B3E]"
                      : "hover:bg-white/10"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>

      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#050B3E] text-white p-4 z-50 flex justify-between items-center">
        <h1 className="font-bold text-lg">Admin</h1>
        <span className="text-sm opacity-70">Menu in Sidebar</span>
      </div>
      <main className="flex-1 p-4 sm:p-6 md:p-8 mt-16 md:mt-0">

        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 min-h-[90vh]">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;