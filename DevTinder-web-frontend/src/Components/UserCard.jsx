import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = (user) =>{

  const {_id, firstName, lastName, photoUrl, about, age, gender} = user.user;
  const dispatch = useDispatch();

  const handleSendRequest = async(status, userId) =>{
    try {

      const res = await axios.post(BASE_URL + "/request/request/send/" + status + "/" + userId,{},{withCredentials:true});
      
      dispatch(removeUserFromFeed(userId));

    } catch (error) {
      console.log("problem in user card", error.response?.data || error.message);

    }
  }

    return (
       <div className="card bg-black w-96 shadow-sm ">
  <figure>
    <img className="p-8"
      src={user.user.photoUrl}
      
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p> {age + ", " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-primary bg-pink-500" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
    )
}
export default UserCard;