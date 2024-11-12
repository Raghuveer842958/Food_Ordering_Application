const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// routes
const foodRoutes = require("./rotes/foodRoute");
const restaurantRoutes = require("./rotes/resturents");
const itemRoutes = require("./rotes/items");
const productRoutes = require("./rotes/product");
const userRoutes = require("./rotes/user");
const orderRoutes = require("./rotes/order");
const paymentRoutes = require("./rotes/payment");
app.use(
  foodRoutes,
  restaurantRoutes,
  itemRoutes,
  productRoutes,
  userRoutes,
  orderRoutes,
  paymentRoutes
);

// db connection
const db = require("./config/connectDB");

app.listen(5000, () => {
  console.log("App Listen on Port 5000");
});
