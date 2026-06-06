// import { useState, useEffect } from "react"
// export default function RandomNumber() {
//     const [num1, setnum1] = useState(0);
//     const [num2, setnum2] = useState(0);
//     const [answer, setanswer] = useState("");
//     const [messege,setmessege]=useState("");

//     const firstRandom = (() => {
//         const first = Math.floor(Math.random() * 100) + 10;
//         const second = Math.floor(Math.random() * 100) + 10;
//         setnum1(first);
//         setnum2(second);
//         setanswer("");
//         setmessege("");
//     })
//     // const secondRandoom = (() => {
//     //     const second = Math.floor(Math.random() * 100) + 10;
//     //     setnum2(second);
//     // }
//     // )
//     useEffect(() => {
//         firstRandom();
//     }, [])
// const validateCaptcha=()=>{
//     const ans=num1+num2;
//     if(Number(answer)===ans){
//     setmessege("This Is Valid");
//     }
//     else{
//         setmessege("this not vald");
//     }
// }
//     return (
//         <div>
//             <h1>{num1}</h1>
//             <h1>{num2}</h1>
//             <input 
//             type="number" 
//             value={answer}
//             placeholder="This is Validation" 
//             onChange={(e)=>setanswer(e.target.value)}/>
//             <button  
//             onClick={validateCaptcha}>zVAlidate</button>
//             <button onClick={firstRandom}>New Number Generator</button>
//             <h3>{messege}</h3>
//         </div>
//     )
// }

import { useState, useEffect } from "react";
import "./RandomNumber.css";

export default function RandomNumber() {
  const [num1, setnum1] = useState(0);
  const [num2, setnum2] = useState(0);
  const [answer, setanswer] = useState("");
  const [messege, setmessege] = useState("");

  const firstRandom = () => {
    const first = Math.floor(Math.random() * 100) + 10;
    const second = Math.floor(Math.random() * 100) + 10;

    setnum1(first);
    setnum2(second);
    setanswer("");
    setmessege("");
  };

  useEffect(() => {
    firstRandom();
  }, []);

  const validateCaptcha = () => {
    const ans = num1 + num2;

    if (Number(answer) === ans) {
      setmessege("✅ Valid Answer");
    } else {
      setmessege("❌ Invalid Answer");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Verify & Validation CAPTCHA</h1>

        <div className="question">
          {num1} + {num2} = ?
        </div>

        <input
          type="number"
          value={answer}
          placeholder="Enter your answer"
          onChange={(e) => setanswer(e.target.value)}
        />

        <div className="btn-group">
          <button className="validate-btn" onClick={validateCaptcha}>
            Validate
          </button>

          <button className="new-btn" onClick={firstRandom}>
            New Numbers
          </button>
        </div>

        {messege && <h3>{messege}</h3>}
      </div>
    </div>
  );
}