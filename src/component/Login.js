

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


import axios from "axios";




export default function LoginPage() {
 const navigate = useNavigate(); 


 const [formData, setFormData] = useState({
   email: "",
   password: "",
 });  


 const [num1, setNum1] = useState(0); 
 const [num2, setNum2] = useState(0); 
 const [answer, setAnswer] = useState("");  
 const [message, setMessage] = useState(""); 


 // Generate random numbers
 const generateNumbers = () => {
   const first = Math.floor(Math.random() * 89) + 11; 
   const second = Math.floor(Math.random() * 89) + 11; 


   setNum1(first);
   setNum2(second); 
   setAnswer("");  
 };


 useEffect(() => {
   generateNumbers(); 
 }, []);

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value,
   });
 };
//   console.log(formData);


// for hard code credentials
const handleLogin = async (e) => {
 e.preventDefault();


 const correctSum = num1 + num2;


 if (Number(answer) !== correctSum) {
   setMessage("❌ Wrong Sum Answer");
   generateNumbers();
   return;
 }


 try {
   const res = await axios.post(
     "http://localhost:5001/login",
     {
       email: formData.email,
       password: formData.password,
     }
   );
   setMessage("✅ Login Successful");


   localStorage.setItem(
     "user",
     JSON.stringify(res.data.user)
   );


   setTimeout(() => {
     navigate("/home");
   }, 1000);


 } catch (err) {
   setMessage(
     err.response?.data?.message ||
     "Login Failed"
   );


   generateNumbers();
 }


 };


 return (
   <div
     style={{
       height: "100vh",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       background: "#f4f4f4",
     }}
   >
     <form
       onSubmit={handleLogin}
       style={{
         width: "380px",
         background: "white",
         padding: "30px",
         borderRadius: "10px",
         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
       }}
     >
       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
         Login Page
       </h2>


       <input
         type="email"
         name="email"
         placeholder="Enter Email"
         value={formData.email}
         onChange={handleChange}
         style={inputStyle}
       />


       <input
         type="password"
         name="password"
         placeholder="Enter Password"
         value={formData.password}
         onChange={handleChange}
         style={inputStyle}
       />


       {/* Random Checker */}
       <div
         style={{
           display: "flex",
           alignItems: "center",
           gap: "10px",
           marginBottom: "20px",
           justifyContent: "center",
           fontSize: "22px",
         }}
       >
         <span>{num1}</span>
         <span>+</span>
         <span>{num2}</span>
         <span>=</span>


         <input
           type="number"
           placeholder="Answer"
           value={answer}
           onChange={(e) => setAnswer(e.target.value)}
           style={{
             width: "100px",
             padding: "8px",
           }}
         />
       </div>


       <button type="submit" style={buttonStyle}>
         Login
       </button>


       <button
         type="button"
         onClick={generateNumbers}
         style={newButtonStyle}
       >
         Generate New Numbers
       </button>


       <p style={{ textAlign: "center", marginTop: "15px" }}>
         {message}
       </p>


       <p style={{ textAlign: "center", marginTop: "15px" }}>
         Don't have an account?{" "}
         <Link to="/signup">Signup</Link>
       </p>
     </form>
   </div>
 );
}


const inputStyle = {
 width: "100%",
 padding: "12px",
 marginBottom: "15px",
 fontSize: "16px",
 borderRadius: "5px",
 border: "1px solid #ccc",
 boxSizing: "border-box",
};


const buttonStyle = {
 width: "100%",
 padding: "12px",
 background: "#28a745",
 color: "white",
 border: "none",
 borderRadius: "5px",
 fontSize: "18px",
 cursor: "pointer",
 marginBottom: "10px",
};


const newButtonStyle = {
 width: "100%",
 padding: "12px",
 background: "#007bff",
 color: "white",
 border: "none",
 borderRadius: "5px",
 fontSize: "16px",
 cursor: "pointer",
};
