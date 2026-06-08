// import React, { useState } from "react";
//  export default function Login() {
//     const navigate =useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [num1, setnum1] = useState(0);
//   const [num2, setnum2] = useState(0);
//   const [answer, setanswer] = useState("");
//   const [messege, setmessege] = useState("");
//   const firstRandom = () => {
//     const first = Math.floor(Math.random() * 100) + 10;
//     const second = Math.floor(Math.random() * 100) + 10;

//     setnum1(first);
//     setnum2(second);
//     setanswer("");
//     setmessege("");
//   };
//   useEffect(() => {
//       firstRandom();
//     }, []);
  
// const handleChange=(e)=>{
//     setFormData({
//         ...formData,
//         [e.target.name]:e.target.value,

//     });
// };
// const handleLogin=(e)=>{
//     e.preventDefault();
//     const coorectmail="verla003renu@gmail.com";
//     const correctPassword="12345";
//     const correctSum=num1+num2;
// }

//     // console.log("Email:", email);
//     // console.log("Password:", password);
//     if(Number(answer)!==correctSum){
//         setmessege("this is wrong sum");
//         firstRandom();
//         return ;
//     }
//     if (
//       formData.email === correctEmail &&
//       formData.password === correctPassword
//     ) {
//       setMessage("✅ Login Successful");

//       // Navigate to home page
//       setTimeout(() => {
//         navigate("/home");
//       }, 1000);
//     } else {
//       setMessage("❌ Invalid Email or Password");
//       generateNumbers();
//     }

//     alert("Login Successful");
//   };

//   return (
//     <div className="container">
//       <form className="form" onSubmit={handleLogin}>
//         <h2>Login</h2>

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );


import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {// login page function h ye okay 
  const navigate = useNavigate(); // navigate for what one page to another or components yes yes good

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });  // ye hooks dekh form and set form  

  const [num1, setNum1] = useState(0); // ye as it is. h 
  const [num2, setNum2] = useState(0); // ye bhi 
  const [answer, setAnswer] = useState("");  // ye bhi 
  const [message, setMessage] = useState(""); // ye bhi right  combine kro chlo itna fataka se 

  // Generate random numbers
  const generateNumbers = () => {
    const first = Math.floor(Math.random() * 89) + 11; // as it is 
    const second = Math.floor(Math.random() * 89) + 11; // as it is 

    setNum1(first);// as it is 
    setNum2(second); // as it is 
    setAnswer("");  // as it is 
  };

  useEffect(() => {
    generateNumbers(); // as it is 
  }, []);
 // this is the implementation for form set data // aaapke m form bna h. na. bs usi k liye 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
//   console.log(formData);

// for hard code credentials 
  const handleLogin = (e) => {
    e.preventDefault();
    const correctEmail = "admin@gmail.com";
    const correctPassword = "12345";
    const correctSum = num1 + num2;

    // Check sum. means captch phle uske baad db ko pareshan krte h 
    if (Number(answer) !== correctSum) {
      setMessage("❌ Wrong Sum Answer");// hmm 
      generateNumbers(); // 
    
      return;
    }

    // Check login
    if (
      formData.email === correctEmail &&
      formData.password === correctPassword
    ) {
      setMessage("✅ Login Successful");

      // Navigate to home page
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setMessage("❌ Invalid Email or Password");
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
