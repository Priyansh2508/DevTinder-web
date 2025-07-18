import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";


const Requests = () =>{
    const requests= useSelector((store) => store.requests);
    const dispatch= useDispatch();

   

    const reviewRequest = async (status,_id) =>{
      try {

        const res = await  axios.post(BASE_URL + "/request/request/review/" + status +"/" +_id,{},{withCredentials: true});
        dispatch(removeRequests(_id));
      } catch (error) {
        console.log("api not working!");
      }
    }

    const fetchRequests = async () =>{
        try {
            const res = await axios.get(BASE_URL + "/user/user/requests/received",{withCredentials: true});

            dispatch(addRequests(res.data.data));
           

        } catch (error) {
            console.log("api not working");
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);
    if(!requests) return;

    if(requests.length == 0) return <h1 className="flex justify-center text-2xl p-4">No requests found!</h1>;

    return (
        <div className="justify-between mt-10">
          <h1 className="text-2xl bold p-2 flex justify-center">Connection Requests</h1>

          {requests.map((request) => {
  const { _id, firstName, lastName, photoUrl, about, skills } = request.fromUserId;

  return (
    <div key={_id} className="p-4">
      <div className="card card-side bg-base-500 shadow-sm border p-4">
        <figure>
          <img className="h-30" src={photoUrl} alt="Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <p>{"Skills: " + skills}</p>

        </div>
   
        <div> 
         <button className="btn btn-secondary mx-2 my-10" onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
         <button className="btn btn-primary mx-2 my-12" onClick={() => reviewRequest("rejected",request._id)}>Reject</button>
      </div>
      </div>
      
    </div>
  );
})}

        </div>
    )
}

export default Requests;