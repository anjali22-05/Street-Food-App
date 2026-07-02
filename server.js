require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes")
const Shops = require("./models/Shops");


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
app.use("", authRoutes);

app.use("/shop", shopRoutes);


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

