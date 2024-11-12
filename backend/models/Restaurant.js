const mongoose = require("mongoose");
const Item = require("./Items");

const resturentSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["veg", "nonveg"],
    required: true,
  },
  restaurantImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "Items",
      },
    },
  ],
});

const Resturents = mongoose.model("Resturents2", resturentSchema);
module.exports = Resturents;
