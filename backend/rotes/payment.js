const express = require("express");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Payment = require("../models/paymentModel");
const router = express.Router();

const processPayment = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const { status, amount, paymentMethod } = req.body;

    if (!userId || !orderId || !status) {
      return res.send({
        message: "Invalid userId or orderId or status",
      });
    }

    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.send({
        message: "There is no any user with this id",
      });
    }

    const isOrder = await Order.findById(orderId);
    if (!isOrder) {
      return res.send({
        message: "There is no any order find by this id",
      });
    }

    // check this order is done by this userId or not
    if (!isUser.odders.includes(orderId)) {
      return res.send({
        message: `this order is not done by ${isUser.name}`,
      });
    }

    const newPayment = new Payment({
      user: userId,
      order: orderId,
      status,
      paymentMethod,
      amount,
    });
    const createdPayment = await newPayment.save();

    // check amount is equal==amount or not

    isOrder.status = "delivered";
    const updatedOrder = await isOrder.save();
    res.send({
      message: "Payment done successflly",
      payment: createdPayment,
      order: updatedOrder,
    });
  } catch (error) {
    return res.send({
      message: "error in /payment/:userId/:orderId route",
      error: error.message,
    });
  }
};

const getPaymentDetails = async (req, res) => {
  try {
    const { userId, paymentId } = req.params;
    if (!paymentId || !userId) {
      return res.send({
        message: "Invalid paymentId or userId",
      });
    }

    const isUser = await User.findById(userId);
    if (isUser) {
      return res.send({
        message: "There is no any user find with this id",
      });
    }

    const isPayment = await Payment.findById(paymentId);
    if (!isPayment) {
      return res.send({
        message: "There is no any payment found with this id",
      });
    }

    if (isPayment.user !== userId) {
      return res.send({
        message: "payment userId and given userId not match",
        paymentUserId: isPayment.user,
        userId: userId,
      });
    }

    return res.send({
      message: "Payment got successfully",
      UserPayment: isPayment,
    });
  } catch (error) {
    console.log("Error in fetching payment details");
    return res.send({
      message: "Error in fetching payment details",
      error: error.message,
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
  } catch (error) {}
};

// Payment Routes (Optional)
router.post("/payment/:userId/:orderId", processPayment);
router.get("/payment/:userId/:paymentId", getPaymentDetails);
router.put("/payment/:id", updatePaymentStatus); // this will handle form the admin only

module.exports = router;
