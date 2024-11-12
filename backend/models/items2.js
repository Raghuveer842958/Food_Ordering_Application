const mongoose = require("mongoose");
const Product = require("./Product");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Pizza",
      "Burger",
      "Pasta",
      "Sandwich",
      "Salad",
      "Appetizers",
      "Beverages",
      "Desserts",
      "Butter Chicken",
      "Paneer Tikka",
      "Biryani",
      "Dal Makhani",
      "Naan",
      "Sushi",
      "Fried Rice",
      "Kung Pao Chicken",
      "Spring Rolls",
      "Ramen",
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.ObjectId,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
});

const Items = mongoose.model("Items2", itemSchema);
module.exports = Items;
