const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items, address } = req.body;
    if (!userId) {
      return res.send({
        message: "userId is not present",
      });
    }
    if (!items || !address) {
      return res.send({
        message: "Please Enter items and address",
      });
    }

    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.send({
        message: "User not Found",
      });
    }
    
    let totalAmount = 0;
    await items.forEach(async (d) => {
      let productId = d.product;
      let currProduct = await Product.findById(productId);
      let q = d.quantity;
      let p = currProduct.price;
      console.log(q, p);
      totalAmount += q * p;
    });

    const newOrder = new Order({ user: userId, items, address, totalAmount });
    const createdOrder = await newOrder.save();
    isUser.odders.push(createdOrder._id);
    const updatedUser = await isUser.save();

    return res.send({
      message: "Order Place successfully",
      order: createdOrder,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in Placing order");
    return res.send({
      message: "Error in Placing Order",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    // fetch the orderId from req.params
    // check weather orderId is valid or not
    // fetch the paticuler orderId from the order collection
    // return the orderId document in response

    const { orderId } = req.params;
    if (!orderId) {
      return res.send({
        message: "Id is not present*****",
      });
    }

    const isOrder = await Order.findById(orderId);
    if (!isOrder) {
      return res.send({
        message: "There is no any orderId with this orderId",
      });
    }

    return res.send({
      message: `This is Details of ${isOrder.name} product`,
      Order: isOrder,
    });
  } catch (error) {
    console.log("Error in /order/:id get by id route");
    return res.send({
      message: "Error in /order/:id get food by id",
      error: error.message,
    });
  }
};

const getAllOrdersForUser=async(req,res)=>{
  try {
    const {userId}=req.params;
    if(!userId){
      return res.send({
        message:"User id is not present"
      })
    }

    const isUser=await User.findById(userId);
    if(!isUser){
      return res.send({
        message:"There is no any user related to this userId"
      })
    }

    const allUserOdders=isUser.odders;
    return res.send({
      message:`${isUser.name} This is your all Odders`,
      allOdders:allUserOdders
    })
  } catch (error) {
    console.log("Error in fetching all user odders");
    return res.send({
      message:"Error in fetching all user odders",
      error:error.message
    })
  }
}

// Order Routes
router.post("/order/:userId", placeOrder); // ✅
router.get("/order/:id", getOrderById); // ✅
router.get("/orders/user/:userId", getAllOrdersForUser); // ✅
// router.put("/order/:id", updateOrderStatus); // Admin or restaurant staff only
// router.delete("/order/:id", cancelOrder);

module.exports = router;
