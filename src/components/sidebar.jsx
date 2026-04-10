import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import sawitDB from "../../sawitDB.png"; // Sesuaikan path gambarnya
import { MENU_CONFIG } from "../menuConfig";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ role, search, setSearch}) {
    const [isOpen, setIsOpen] = useState(false);
    //const [search, setSearch] = useState("");
    const menus = MENU_CONFIG[role] || MENU_CONFIG.user;
    const location = useLocation();

    return (
        <aside className="w-64 h-screen fixed top-0 left-0 hidden lg:block bg-sub1 p-6 text-white overflow-y-auto z-40">
            <img src={sawitDB} alt="Logo" className="mb-4" />
            
            {/* Search Bar */}
            <div className="my-3 flex justify-center">
                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex items-center">
                        <FaSearch className="absolute ml-3 text-black" />
                        <input
                            type="text"
                            className="w-full rounded-md pl-10 pr-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-sub2"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>
            </div>

            {/* Main Menu */}
            <div className="text-xl font-bold mt-3 mb-4 text-white">Main Menu</div>

            {/* Dropdown My Restaurant */}
            <nav className="flex flex-col gap-2">
        <p className="text-xs text-gray-400 uppercase font-bold mb-2">
          {role === 'admin' ? 'Admin Panel' : 'Menu Utama'}
        </p>

        {menus.map((item, index) => {
          // Logika untuk menandai menu yang sedang aktif
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={index} 
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive ? "bg-sub2 text-white" : "hover:bg-white/10 text-gray-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

            {/* Others */}
            <div className="text-xl font-bold mb-4">Others</div>
            <button className="ml-4 hover:text-sub2">Settings</button>
        </aside>
    );
}