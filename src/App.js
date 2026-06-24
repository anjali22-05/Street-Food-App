
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Login";
import SignupPage from "./component/Signup";
import Home from "./component/Home";
import AddShop from "./component/addShop"

function App() {  
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<LoginPage />} />  

        <Route path="/signup" element={<SignupPage />} /> 

        <Route path="/home" element={<Home />} /> 

        <Route path="/addShop" element={<AddShop/>}/>
      </Routes>
    </BrowserRouter>    
  );
}
export default App;
