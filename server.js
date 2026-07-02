require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const shopRoutes= require("./routes/shopRoutes")
const Shops = require("./models/Shops");


app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    dbName:"mydb"
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/",(req,res)=>{
   res.send('<h1>Hii</h1>');
})


// API for Add Shop
// app.post("/addShop", async (req, res) => {
//   try {
//     const {
//       shopName,
//       timing,
//       popularDish,
//       price,
//       address,
//       image
//     } = req.body;

//     // Validation
//     if (
//       !shopName ||
//       !timing ||
//       !popularDish ||
//       !price ||
//       !address ||
//       !image
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     // Create shop
//     const shop = await Shops.create({
//       shopName,
//       timing,
//       popularDish,
//       price,
//       address,
//       image,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Shop Added Successfully",
//       shop: {
//         shopName: shop.shopName,
//         timing: shop.timing,
//         popularDish: shop.popularDish,
//         price: shop.price,
//         address: shop.address,
//         image: shop.image,
//       },
//     });

//   } catch (error) {
//     console.error("Error adding shop:", error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });


// get for the allshops

app.get("/viewShops", async (req, res) => {
  try {
    const shops = await Shops.find();

    console.log(shops);
    shops.forEach(e=>console.log(e.shopName));
    // console.log(shops[0].shopName);
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("",authRoutes);

app.use("/shop",shopRoutes);

const PORT =5001;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

