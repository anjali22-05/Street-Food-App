
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/Login";
import SignupPage from "./component/Signup";
import Home from "./component/Home";

function App() {   // routes hote 
  return (
    <BrowserRouter>// for main router 
      <Routes> // multiple route for handling components
        <Route path="/" element={<LoginPage />} /> // one components as a element 

        <Route path="/signup" element={<SignupPage />} />// signup 

        <Route path="/home" element={<Home />} /> // home
      </Routes>
    </BrowserRouter>
  );
}

export default App;
