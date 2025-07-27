import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const resp = await axios.post(
       BASE_URL + "/auth/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(resp.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post( BASE_URL + "/auth/signup",{firstName, lastName, emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (error) {
      
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-bod">
          <h2 className="flex justify-center text-3xl">{isLoginForm?"Login":"Sign Up" }</h2>
          <div className="mx-6">
           {!isLoginForm && <> <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                placeholder="Type here"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <div className="relative">
                <input
                  type= "text"
                  value={lastName}
                  className="input"
                  placeholder="Type here"
                  onChange={(e) => setLastName(e.target.value)}
                />
               
              </div>
              
               </fieldset>
                </>}
               <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="Type here"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="input pr-10"
                  placeholder="Type here"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              </fieldset> 
              

            
           
          </div>

          <p className="text-red-500 ml-6">{error}</p>

          <div className="card-actions justify-center mb-5">
            <button className="btn btn-primary mt-4" onClick={isLoginForm?handleLogin:handleSignUp}>
              {isLoginForm?"Login":"Sign Up"}
            </button>
          </div>

          <p className="flex justify-center hover:cursor-pointer" onClick={()=>setIsLoginForm((value) => !value)}>{isLoginForm?"New user? Sign Up here!" : "Existing user? Login here!"}</p>

        </div>
      </div>
    </div>
  );
};

export default Login;
