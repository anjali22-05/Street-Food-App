const mongoose=require("mongoose");
const  shopSchema=new mongoose.Schema(
    {
        shopName:{
            type:String,
            required:true,
        },
        timing:{
            type:String,
            required:true
        },
        popularDish:{
            type:String,
            required:true,
        },
       price:{
        type:Number,
        required:true,
       },
       address:{
        type:String,
        required:true,
       },
       image:{
        type:String,
       }

    }
);

module.exports=mongoose.model("Shops",shopSchema)