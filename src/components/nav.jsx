import "../index.css"
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { MENU_CONFIG } from "../menuConfig";

export default function Navbar ({ role, search, setSearch }) {
    const menus = MENU_CONFIG[role] || MENU_CONFIG.user
    const location = useLocation()
   
    return(
        <div className="bg-primary flex ">
            <div className="font-bold w-1/4 m-2 ">

                ceritanya logo
            
            </div>
            <div className="w-2/4 m-2 flex justify-center">
                <form className="w-full">
                    <input 
                        type="text"
                        className="w-full rounded-md px-3"
                        placeholder="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">
          {role === 'admin' ? 'Admin Panel' : 'Menu Utama'}
        </p>
            <div className="w-1/4 mx-4 flex items-center justify-end     " >
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
            </div>
        </div>
    )
}