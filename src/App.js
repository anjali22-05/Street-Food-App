
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Login";
import SignupPage from "./component/Signup";
import Home from "./component/Home";
import AddShop from "./component/addShop"
import ViewShops from "./component/ViewShops";
import EditShop from "./component/EditShop"

function App() {  
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<LoginPage />} />  

        <Route path="/signup" element={<SignupPage />} /> 

        <Route path="/home" element={<Home />} /> 

        <Route path="/addShop" element={<AddShop/>}/>
        <Route path="/viewShops" element={<ViewShops/>}/>
        <Route path="/editShop/:id" element={<EditShop />} />
      </Routes>
    </BrowserRouter>    
  );
}
export default App;
