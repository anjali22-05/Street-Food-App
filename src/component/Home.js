import { Link } from "react-router-dom";


export default function Home() {


 const user = JSON.parse(
   localStorage.getItem("user")
 );


 const hour = new Date().getHours();


 let greeting = "";


 if (hour < 12) {
   greeting = "Good Morning";
 } else if (hour < 17) {
   greeting = "Good Afternoon";
 } else {
   greeting = "Good Evening";
 }


 return (
   <>
     <h1>
       {greeting} {user?.name}
     </h1>


     <h2>
       Welcome to Street Food App
     </h2>


     <p>{user?.email}</p>


     <button
       onClick={() => {
         localStorage.removeItem("user");
         window.location.href = "/";
       }}
       style={buttonStyle}
     >
       Logout
     </button>
   </>
 );
}




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
