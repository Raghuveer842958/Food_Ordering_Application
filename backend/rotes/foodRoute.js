const express = require("express");
const router = express.Router();
const Food = require("../models/FoodsModel");

const createFood = async (req, res) => {
  try {
    const { name } = req.body;
    const isName = await Food.findOne({ name: name });
    if (isName) {
      return res.send({
        message: `${name} Food is allready exist`,
      });
    }
    const newFood = Food({ name });
    const createFood = await newFood.save();
    return res.send({
      message: `${name} food created successfully`,
      food: createFood,
    });
  } catch (error) {
    console.log("Error in /food route");
    return res.send({
      message: "Error in /food route",
      error: error.message,
    });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foodList = await Food.find();
    return res.send({
      message: `this is the all food list`,
      foodList: foodList,
    });
  } catch (error) {
    return res.send({
      message: `Error in /food get all food roues`,
      error: error.message,
    });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { foodId } = req.params;
    if (!foodId) {
      return res.send({
        message: "Invalid foodId",
      });
    }
    const isFood = await Food.findById(foodId);
    if (!isFood) {
      return res.send({
        message: "There is no any Food with this name",
      });
    }
    return res.send({
      message: `This is Details of ${isFood.name} product`,
      food: isId,
    });
  } catch (error) {
    console.log("Error in /food/:id get by id route");
    return res.send({
      message: "Error in /food/:id get food by id",
      error: error.message,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const data = req.body;
    if (!foodId) {
      return res.send({
        message: "Id is not present*****",
      });
    }
    const updatedFood = await Food.findByIdAndUpdate(foodId, data);
    if (!updatedFood) {
      return res.send({
        message: "There is no any Food with this name",
      });
    }
    return res.send({
      message: `${updatedFood.name} Food is successfully updated `,
      updatedFood: updatedFood,
    });
  } catch (error) {
    console.log("Error in /food/:id in updating the existing food");
    res.send({
      message: "Error in /food/:id in updating the existing food",
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    if (!foodId) {
      return res.send({
        message: "Id is not present",
      });
    }
    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood) {
      return res.send({
        message: "There is no any Food with this name",
      });
    }

    return res.send({
      message: `${deletedFood.name} food successfully deleted`,
      deletedFood: deletedFood,
    });
  } catch (error) {
    console.log("Error in /food/:id in deleting route");
    return res.send({
      message: "Error in /food/:id in deleting route",
      error: error.message,
    });
  }
};

router.post("/food", createFood);
router.get("/food", getAllFoods);
router.get("/food/:foodId", getFoodById);
router.put("/food/:foodId", updateFood);
router.delete("/food/:foodId", deleteFood);

module.exports = router;
