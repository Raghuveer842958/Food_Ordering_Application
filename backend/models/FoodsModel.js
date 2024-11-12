const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Foods = mongoose.model("Foods", foodSchema);
module.exports = Foods;
