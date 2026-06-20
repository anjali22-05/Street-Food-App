

import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";


export default function SignupPage() {
 const [formData, setFormData] = useState({
   name: "",
   email: "",
   password: "",
 });
const navigate = useNavigate();
 const [message, setMessage] = useState("");


 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value,
   });
 };


 const handleSubmit = async (e) => {
 e.preventDefault();


 try {
   const res = await axios.post(
     "http://localhost:5001/signup",
     formData
   );


   setMessage(res.data.message);


   setFormData({
     name: "",
     email: "",
     password: "",
   });


   setTimeout(() => {
     navigate("/");
   }, 1000);


 } catch (err) {
   setMessage(
     err.response?.data?.message ||
     "Signup Failed"
   );
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
       onSubmit={handleSubmit}
       style={{
         width: "350px",
         background: "white",
         padding: "30px",
         borderRadius: "10px",
         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
       }}
     >
       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
         Signup Page
       </h2>


       <input
         type="text"
         name="name"
         placeholder="Enter Name"
         value={formData.name}
         onChange={handleChange}
         style={inputStyle}
       />


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


       <button type="submit" style={buttonStyle}>
         Sign Up
       </button>
       <p style={{ textAlign: "center" }}>
 Already have an account? <Link to="/">Login</Link>
</p>


       <p style={{ textAlign: "center", marginTop: "15px" }}>
         {message}
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
 background: "#007bff",
 color: "white",
 border: "none",
 borderRadius: "5px",
 fontSize: "18px",
 cursor: "pointer",
};