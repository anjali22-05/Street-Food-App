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

    
  // user.forEach(e=>console.log(e.name));  
  console.log(user.name);
  }
    catch(error){
      res.status(500).json({messege:error.messege})
    }
})
app.get("/viewShop/:id", async (req, res) => {
  try {
    const shop = await Shops.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});




app.put("/updateShop/:id", async (req, res) => {
  try {
    const updatedShop = await Shops.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedShop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    res.status(200).json({
      message: "Shop updated successfully",
      shop: updatedShop,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// app.use("/alluser",userRoutes);
app.use("", authRoutes);

app.use("/shop", shopRoutes);


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

