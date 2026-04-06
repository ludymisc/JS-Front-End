import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import sawitDB from "../../sawitDB.png"; // Sesuaikan path gambarnya

export default function Sidebar({ search, setSearch}) {
    const [isOpen, setIsOpen] = useState(false);
    //const [search, setSearch] = useState("");

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
            
            <div className="flex items-center cursor-pointer ml-4 mb-4 hover:text-sub2 gap-2 transition-colors">
                <MdOutlineDashboard />
                <span>Dashboard</span>
            </div>

            {/* Dropdown My Restaurant */}
            <div
                className="flex items-center justify-between ml-4 mb-2 cursor-pointer hover:text-sub2 transition-colors"
                onClick={() => setIsOpen(prev => !prev)}>
                <span className="flex items-center gap-2">My Restaurant</span>
                <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
            </div>

            {isOpen && (
                <div className="ml-8 flex flex-col mb-4 gap-2 animate-fadeIn">
                    <button className="text-left text-sm hover:text-sub2">Add Product</button>
                    <button className="text-left text-sm hover:text-sub2">Manage Inventory</button>
                </div>
            )}

            <button className="ml-4 block mb-6 hover:text-sub2">Analytics Reports</button>

            {/* Others */}
            <div className="text-xl font-bold mb-4">Others</div>
            <button className="ml-4 hover:text-sub2">Settings</button>
        </aside>
    );
}