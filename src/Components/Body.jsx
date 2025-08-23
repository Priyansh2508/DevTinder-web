import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  // STEP 1: Import and use the useLocation hook
  const location = useLocation();

  // STEP 2: Check if the current path is a chat page
  const isChatPage = location.pathname.startsWith('/chat');

  const fetchUser = async () => {
    if(userData) {
      setLoading(false); // If user data exists, no need to fetch
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      
      {/* STEP 3: Conditionally render the Footer */}
      {/* It will only render if 'isChatPage' is false. */}
      {!isChatPage && <Footer />}
    </div>
  );
};

export default Body;