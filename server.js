require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes")
const Shops = require("./models/Shops");
const User=require(("./models/User"));


app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    dbName: "mydb"
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send('<h1>Hii</h1>');
})
app.get("/alluser",async(req,res)=>{
  try{
    const user= await User.find();
    console.log(user);
    user.forEach(e=>console.log(e.user));
    res.status(200).json(user);  
  console.log(user.name);
  }
    catch(error){
      res.status(500).json({messege:error.messege})
    }
})
app.use("", authRoutes);

app.use("/shop", shopRoutes);


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

