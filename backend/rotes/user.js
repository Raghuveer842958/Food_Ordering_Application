const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const validateSignUpData = require("../middlewares/validator");
const userAuth = require("../middlewares/userAuth");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, ...rest } = req.body;
    console.log("rest is :", rest);
    if (!name || !email || !password) {
      return res.send({
        message: "Invalid Credential",
      });
    }

    validateSignUpData(req);

    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.send({
        message: "Email is Allready Registerd",
        user: isUser,
      });
    }

    const newUser = new User({ name, email, password, ...rest });
    const createdUser = await newUser.save();

    return res.send({
      message: `${createdUser.name} You are Successfully Registered`,
      user: createdUser,
      result: true,
    });
  } catch (error) {
    console.log("Error in SignUp user");
    return res.send({
      message: "Error in SignUp user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res.send({
        message: "Invalid email please Register first",
      });
    }

    if (!(await isUser.comparePassword(password))) {
      return res.send({
        message: "Invalid Password",
      });
    }

    const token = await isUser.generateToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    return res.send({
      message: `${isUser.name} You are successfully Logined`,
      user: isUser,
      token: token,
      result: true,
    });
  } catch (error) {
    console.log("Error in SignIn User");
    console.log("Error :", error.message);
    return res.send({
      message: "Error in SignIn User",
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.send({
        message: "Invalid userId",
      });
    }

    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.send({
        message: "There is no any user with this id",
      });
    }

    res.send({
      message: `${isUser.name} This is Your Profile`,
      profile: isUser,
      result:true
    });
  } catch (error) {}
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.send({
        message: "Invalid userId",
      });
    }

    const data = req.body;

    const isUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!isUser) {
      return res.send({
        message: "Ther is not any user related to this userId",
      });
    }

    return res.send({
      message: `${isUser.name} Your Profile Successfully Updated`,
      updatedProfile: isUser,
    });
  } catch (error) {}
};

const logoutUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.send({
        message: "Invalid userId",
      });
    }

    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.send({
        message: "There is no any user with this id",
      });
    }

    res.cookie("token", "");
    return res.send({
      message: `${isUser.name} You are Successfully LogOut`,
    });
  } catch (error) {}
};

// User Routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/profile/:userId", getUserProfile);
router.put("/user/profile/:userId", updateUserProfile);
router.post("/user/logout/:userId", logoutUser);

module.exports = router;
