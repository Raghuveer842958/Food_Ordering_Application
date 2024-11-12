const mongoose = require("mongoose");
const Item = require("./Items");

const resturentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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

resturentSchema.pre("findOneAndDelete", async function (next) {
  const restaurantId = this.getFilter()._id; // Get the restaurant id being deleted

  try {
    // Find and delete all items associated with this restaurant
    await Item.deleteMany({ restaurantId });
    next();
  } catch (error) {
    next(error);
  }
});

const Resturents = mongoose.model("Resturents", resturentSchema);
module.exports = Resturents;
