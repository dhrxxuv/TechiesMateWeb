import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../Redux/userSlice";
import axios from "axios";
import { baseApi } from "../utils/api";
import { removeFeed } from "../Redux/feedSlice";
import { removeConnection } from "../Redux/connectionSlic";

export const NavBar = () => {
    const navigate = useNavigate()
    const user = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    const HandleLogOut = async ()=>{
      try{
         await axios.post(baseApi+"/logout",{},{
          withCredentials:true
        })  
        dispatch(removeUser())
        dispatch(removeFeed())
        dispatch(removeConnection())
        navigate('/login')

      }catch(err){
        console.log(err)
      }
    }
    return (
    <div className="w-full fixed top-0 left-0 z-50 bg-gray-50 text-gray-900 shadow-md">
      <div className="navbar container mx-auto px-4 py-3">
        {/* Left - TechiesMate */}
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-2xl font-bold text-gray-900 hover:bg-gray-200 shimmer transition-transform hover:scale-105"
          >
            TechiesMate
          </Link>
        </div>

        {/* Right - User Dropdown */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                aria-label={`User profile menu for ${user.firstName}`}
                className="btn btn-ghost btn-circle avatar relative shimmer"
              >
                <div className="w-10 rounded-full overflow-hidden ring-2 ring-blue-500">
                  <img
                    alt={`${user.firstName}'s profile`}
                    src={user.photoUrl}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-white text-gray-900 rounded-box mt-2 w-64 p-3 shadow-lg transform transition-all duration-300 ease-in-out"
              >
                <li className=" py-2 text-sm font-medium text-gray-700">
                  <span>Hi,{user.firstName}</span>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex justify-between items-center py-2 px-3 hover:bg-gray-100 shimmer transition-transform hover:translate-x-1"
                  >
                    Profile
                    <span className="badge badge-primary bg-blue-500 text-white">New</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Connection"
                    className="py-2 px-3 hover:bg-gray-100 shimmer transition-transform hover:translate-x-1"
                  >
                    Connection
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Connection-Request"
                    className="py-2 px-3 hover:bg-gray-100 shimmer transition-transform hover:translate-x-1"
                  >
                    Request
                  </Link>
                </li>
                <li>
                  <button
                    onClick={HandleLogOut}
                    className="py-2 px-3 text-left bg-red-600 hover:bg-red-800 text-white transition-colors duration-200 rounded-md"
                  >
                    Logout
                  </button>

                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };
  