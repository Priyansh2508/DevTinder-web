import Body from './Components/Body';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './Components/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Login from './Components/Login';
import Feed from './Components/Feed';
import Connections from './Components/Connections';
import Requests from './Components/Requests';
import Premium from './Components/Premium';

function App() {
  return (
    <>
   <Provider store={appStore}>
     <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
         <Route path="/login" element={<Login/>}/>
         <Route path="/profile" element={<Profile/>}/>
         <Route path='/feed' element={<Feed/>}/>
         <Route path='/connections' element={<Connections/>}/>
         <Route path='/requests' element={<Requests/>}/>
         <Route path='/premium' element={<Premium/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
    </>
   
  );
}

export default App;