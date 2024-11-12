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

// Pre-remove hook to delete associated products
itemSchema.pre("deleteMany", async function (next) {
  const itemId = this.getFilter()._id; // Get the item id being deleted

  try {
    // Delete all products associated with this item
    console.log("first");
    await Product.deleteMany({ itemId });
    next();
  } catch (error) {
    next(error);
  }
});

itemSchema.pre("findOneAndDelete", async function (next) {
  const itemId = this.getFilter()._id; // Get the item id being deleted

  try {
    // Delete all products associated with this item
    console.log("first");
    await Product.deleteMany({ itemId });
    next();
  } catch (error) {
    next(error);
  }
});

const Items = mongoose.model("Items", itemSchema);
module.exports = Items;
