
import { Link } from "react-router-dom"

export default function (){
    return(
        <>
        <h1>This is Home Page for Sreet Food App </h1>
        <button style={buttonStyle}><Link to='/'>Logout</Link></button>
        </>

    )
}


const buttonStyle = {
  width:"10%",
  padding: "10px",
  background: "#e1c8c8",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "18px",
  cursor: "pointer",
  marginBottom: "10px",
};
