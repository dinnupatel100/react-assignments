import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-gray-800 h-20 p-1">
      <div className="flex justify-between py-5 text-xl text-white">
        <div className="flex space-x-9 mx-5">
          <h3>
            <Link to="/" id="nav-brand">
              Todo App
            </Link>
          </h3>
        <p> <Link to="/">Home</Link></p>
        </div>
        <button className="flex bg-white text-gray-950 mx-10 rounded-xl w-30 p-2 text-sm shadow-lg hover:bg-gray-700">
          <Link to='/add' className="flex"><Plus className="h-5" /> Add todo </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;