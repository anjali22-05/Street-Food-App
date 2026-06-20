
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Login";
import SignupPage from "./component/Signup";
import Home from "./component/Home";


function App() {  
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<LoginPage />} />  

        <Route path="/signup" element={<SignupPage />} /> 

        <Route path="/home" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
