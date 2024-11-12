const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const validateSignUpData = require("../middlewares/validator");
const userAuth = require("../middlewares/userAuth");

const addToCart = async (req, res) => {};

const removeToCart = async () => {};

const clearCart = async () => {};

const getCart = async () => {};

module.exports = router;
