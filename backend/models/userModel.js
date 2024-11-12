const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
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
  address: [
    {
      type: String,
    },
  ],
  phoneNo: {
    type: Number,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  odders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Odder",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.pre("save", async function (next, password) {
  try {
    const user = this;
    if (this.isModified("password")) {
      console.log("Password field modified :", this.password);
      const hashPassword = await bcrypt.hash(user.password, 10);
      user.password = hashPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (givenPassword) {
  try {
    const user = this;
    const check = await bcrypt.compare(givenPassword, user.password);
    return check;
  } catch (error) {
    return error;
  }
};

userSchema.methods.generateToken = async function () {
  try {
    const payload = {
      id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
    };
    const token = await jwt.sign(payload, "Raghu", { expiresIn: "7d" });
    return token;
  } catch (error) {
    return error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
