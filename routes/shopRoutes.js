const express = require("express");
// 1. Capitalize 'Shops' to match how you use it below
const Shops = require("../models/Shops"); 
const router = express.Router();

// Add shop route
router.post("/addShop", async (req, res) => {
  try {
    const {
      shopName,
      timing,
      popularDish,
      price,
      address,
      image
    } = req.body;

    // Validation
    if (
      !shopName ||
      !timing ||
      !popularDish ||
      !price ||
      !address ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2. Using 'Shops.create' will now work perfectly. 
    // Changed the variable name to 'newShop' to avoid variable conflicts.
    const newShop = await Shops.create({
      shopName,
      timing,
      popularDish,
      price,
      address,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Shop Added Successfully",
      shop: {
        shopName: newShop.shopName,
        timing: newShop.timing,
        popularDish: newShop.popularDish,
        price: newShop.price,
        address: newShop.address,
        image: newShop.image,
      },
    });

  } catch (error) {
    // This will now print the actual error to your terminal if anything else goes wrong
    console.error("Error adding shop:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//fetching all shops
router.get("/viewShop/:id",async (req,res)=>{
  try{
    const shop=await Shops.findById(req.params.id);
    if(!shop){
      return res.status(404).json({messege:"Shop Not Found"});
      
    }
    return res.status(200).json(Shop);
  }
  catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
})
router.get("/viewShops", async (req, res) => {
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
module.exports = router;