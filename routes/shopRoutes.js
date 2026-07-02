// const express=require("express");;
// const shop=require("../models/Shops");
// const router=express.Router();
// //it is add shop routes
// router.post("/addShop", async (req, res) => {
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


// module.exports = router;






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

module.exports = router;