import "../index.css"
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Navbar ({search, setSearch, setIsOpen}) {
   
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
            <div className="w-1/4 mx-4 flex items-center justify-end     " >
                <button>
                    <Link to="/cart"><FaCartShopping className="text-3xl"/></Link>
                </button>
            </div>
        </div>
    )
}