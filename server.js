require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");


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

app.use("",authRoutes);

const PORT =5001;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

