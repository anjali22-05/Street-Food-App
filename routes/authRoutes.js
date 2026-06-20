const express=require("express");
const bcryptjs=require("bcryptjs");
const User=require("../models/User");
const router=express.Router();

//it is signup route
router.post("/signup", async (req, res) => {
 try {
   const { name, email, password } = req.body;


   if (!name || !email || !password) {
     return res.status(400).json({
       success: false,
       message: "All fields are required",
     });
   }
   const existingUser = await User.findOne({ email });


   if (existingUser) {
     return res.status(400).json({
       success: false,
       message: "Email already exists",
     });
   }
   const hashedPassword = await bcryptjs.hash(password, 10);
   const user = await User.create({
     name,
     email,
     password: hashedPassword,
   });
   res.status(201).json({
     success: true,
     message: "User Registered Successfully",
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
     },
   });
 } catch (error) {
   console.log(error);


   res.status(500).json({
     success: false,
     message: "Server Error",
   });
 }
});




// ====================
// LOGIN routes
router.post("/login", async (req, res) => {
 try {
   const { email, password } = req.body;


   if (!email || !password) {
     return res.status(400).json({
       success: false,
       message: "Email and Password required",
     });
   }


   const user = await User.findOne({ email });


   if (!user) {
     return res.status(404).json({
       success: false,
       message: "User not found",
     });
   }


   const isMatch = await bcryptjs.compare(
     password,
     user.password
   );


   if (!isMatch) {
     return res.status(401).json({
       success: false,
       message: "Invalid Password",
     });
   }


   return res.status(200).json({
     success: true,
     message: "Login Successful",
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
     },
   });


 } catch (error) {
   console.log(error);


   return res.status(500).json({
     success: false,
     message: "Server Error",
   });
 }
});


module.exports = router;