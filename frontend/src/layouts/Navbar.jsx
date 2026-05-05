
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#0a0e54] px-4 py-3 md:px-10 sticky top-0 z-50 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0a0e54] font-black text-xl italic">
            D
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            igital Heroes
          </div>
        </Link>
        <div className="flex items-center space-x-3">
          <Link 
            to="/login" 
            className="px-5 py-2 text-sm font-bold text-white border border-blue-800 rounded-md hover:bg-blue-900/50 transition"
          >
            Login
          </Link>
          <Link 
            to="/Charity" 
            className="px-5 py-2 text-sm font-bold text-white bg-[#1a45c4] rounded-md hover:bg-blue-600 transition shadow-md"
          >
            Charity
          </Link>
        </div>
      </div>

     
    </nav>
  );
};

export default Navbar;