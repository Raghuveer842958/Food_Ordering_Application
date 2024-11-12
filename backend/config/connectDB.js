const mongoose = require("mongoose");

const base = "mongodb://localhost:27017/InternShip01";
const connectDB = async () => {
  await mongoose.connect(base);
};

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error in connecting Database");
  });