import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";


const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async ()=>{
    const res = await axios.get(BASE_URL + "payment/premium/verify",{
      withCredentials: true,
    });

    if(res.data.isPremium){
      setIsUserPremium(true);
    }
  }

  const handleBuyClick = async(type) => {
    const order = await axios.post(BASE_URL + "/payment/create",
       {
      membershipType: type
       },
       {
        withCredentials: true
       })
       
       const { amount , keyId, currency, notes, orderId} = order.data;

       const options = {
        key: keyId, 
        amount: amount,
        currency: currency,
        name: 'Dev Connect',
        description: 'Test Transaction',
        order_id: orderId, 
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

  }

  return isUserPremium ?  (
    "You are already a Premium User!"
  ):(
    <div className="m-10 mx-80">
       <div className="flex w-full flex-col lg:flex-row h-full">
        <div>
          <div className="card bg-base-300 rounded-box grid h-150 grow place-items-center">
             <img src="/luxury.png" className="w-7/15 "></img>
              <h1 className="text-2xl font-bold">Gold Membership</h1>
              <ul>
                <li>- Chat with other people</li>
                <li>- Infinite connection requests per day</li>
                <li>- Verified blue tick</li>
                <li>- Valid for 6 months</li>
              </ul>
              <button onClick={()=>handleBuyClick("gold")} className="bg-blue-700 p-2 rounded-sm cursor-pointer">Buy Gold</button>
            </div>
        </div>
  
  <div className="divider lg:divider-horizontal">OR</div>

 <div>
          <div className="card bg-base-300 rounded-box grid h-150 grow place-items-center">
             <img src="/luxury (2).png" className="w-7/15"></img>
              <h1 className="text-2xl font-bold">Silver Membership</h1>
              <ul>
                <li>- Chat with other people</li>
                <li>- 100 connection requests per day</li>
                <li>- Verified blue tick</li>
                <li>- Valid for 3 months</li>
              </ul>
              <button onClick={()=>handleBuyClick("silver")} className="bg-blue-700 p-2 rounded-sm cursor-pointer">Buy Silver</button>
            </div>
        </div>
  
   </div>
    </div>
  
  ) 
}

export default Premium;
