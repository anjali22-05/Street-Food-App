const mongoose=require("mongoose");
const  reviewSchema=new mongoose.Schema(
    {
        By:{
            type:String,
            required:true,
        },
       Rating:{
        type:Number,
       },
       Review:{
        type:String,
       }
    }
);

module.exports=mongoose.model("Review",reviewSchema)