import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ( {user})=>{


    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills);
    const [about,setAbout] = useState(user.about);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [showToast,setShowToast] = useState(false);

    const saveProfile =  async () => {
      try {
        const res = await axios.patch(BASE_URL + "/profile/profile/edit",{
          firstName, lastName, photoUrl, skills, about
        },{
          withCredentials: true
        });
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        const i = setInterval(() => {
          setShowToast(false);

        },3000);
      } catch (error) {
        console.log(error);
        setError(error)
      }
    }

    
    return (
        <>
        <div className="flex justify-center my-10">
             <div className="flex justify-center mx-10">
             <div className="card card-border bg-base-300 w-96 ">
  <div className="card-bod ">
    <h2 className="flex justify-center text-3xl">Edit Profile</h2>
    <div className="mx-6">
        <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" value={firstName} className="input" placeholder="Type here"
  onChange={(e) => setFirstName(e.target.value)}
  />
 
</fieldset>


<fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" value={lastName} className="input" placeholder="Type here"
  onChange={(e) => setLastName(e.target.value)}
  />
 
</fieldset>


<fieldset className="fieldset">
  <legend className="fieldset-legend">Photo Url</legend>
  <input type="text" value={photoUrl} className="input" placeholder="Type here"
  onChange={(e) => setPhotoUrl(e.target.value)}
  />
 
</fieldset>


<fieldset className="fieldset">
  <legend className="fieldset-legend">Skills</legend>
  <input type="text" value={skills} className="input" placeholder="Type here"
  onChange={(e) => setSkills(e.target.value)}
  />
 
</fieldset>


<fieldset className="fieldset">
  <legend className="fieldset-legend">About</legend>
  <input type="text" value={about} className="input" placeholder="Type here"
  onChange={(e) => setAbout(e.target.value)}
  />
</fieldset>


    </div >
    <p className="text-red-500 ml-6">{error}</p>
    <div className="card-actions justify-center mb-5">
      <button className="btn btn-primary mt-4" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
        </div>
        <div >
          <p className="flex justify-center text-3xl ">Preview</p>
          <div className="">
             <UserCard user = {{firstName, lastName, photoUrl, skills, about}}/>
          </div>
            
        </div>
       
        </div>
       {showToast &&( <div className="toast toast-top toast-center">

  <div className="alert alert-success">
    <span>Profile saved successfully!</span>
  </div>
</div>)
}
        </>
        
       
    
    )
}

export default EditProfile;