import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections =( )=>{

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () =>{
        try {
            const res = await axios.get(BASE_URL + "/user/user/connections",{withCredentials: true});
            console.log(res.data);
            dispatch(addConnections(res.data.data));

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length == 0) return <h1>No connections found!</h1>;

    return (
        <div className="justify-center mt-10">
          <h1 className="text-2xl bold p-2 flex justify-center">Connections</h1>

          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, about, skills} = connection;
  
            return (
               <div className="p-4">
              <div className="card card-side bg-base-500 shadow-sm border p-4">
  <figure>
    <img className="h-30"
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    
    <h2 className="card-title">{firstName + " " + lastName}</h2>

    <p>{about}</p>
    <p>{"Skills: " + skills}</p>
   
  </div>
</div>
        </div>    );
          })}
        </div>
    )
}

export default Connections;
