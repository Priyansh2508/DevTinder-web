import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice"
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogout= async() =>{
    try {
    await axios.post(BASE_URL+"/auth/logout",{},{withCredentials: true});
    dispatch(removeUser());
   return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-5 my-auto p-7"
            >
              Welcome, {user.firstName}!
            </div>

            <div className="w-10 rounded-full">
              <img
                className="rounded-2xl mt-2.5"
                src={user.photoUrl}
              />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
