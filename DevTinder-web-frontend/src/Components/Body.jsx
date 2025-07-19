import { Outlet, useNavigate } from "react-router-dom";
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
  const userData=useSelector((store)=>store.user);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
    
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        navigate("/login"); // Redirect only if 400 (e.g. unauthenticated)
      }
    } finally {
      setLoading(false); // Ensure we stop loading
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
      <Footer />
    </div>
  );
};

export default Body;
