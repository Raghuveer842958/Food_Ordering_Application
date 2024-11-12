const express = require("express");
const router = express.Router();
const Restaurant = require("../models/ResturentModel");
const Items = require("../models/Items");

const createRestaurant = async (req, res) => {
  try {
    // validate the user data
    // check Restaurant is allready exist or not
    // create new restaurant and send response

    const { name, location } = req.body;
    if (!name || !location) {
      return res.send({
        message: "Enter name and Location Properly",
      });
    }

    // check weather Restaurant is allready exist or not
    const isName = await Restaurant.findOne({ name: name });
    if (isName) {
      return res.send({
        message: `${name} Resturent allready exist`,
      });
    }

    const newRestaurant = new Restaurant({ name, location });
    const createdRestaurant = await newRestaurant.save();
    return res.send({
      message: `${name} newRestaurant created successfully`,
      Resturent: createdRestaurant,
    });
  } catch (error) {
    console.log("Error in /restaurant route");
    return res.send({
      message: "Error in /restaurant route",
      error: error.message,
    });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    // fetch all restaurant from Restaurant collecton
    // send all restaurant in response

    const restaurantList = await Restaurant.find();
    return res.send({
      message: `this is the all Restaurant list`,
      restaurantList: restaurantList,
    });
  } catch (error) {
    return res.send({
      message: `Error in /food get all food restaurants`,
      error: error.message,
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    // fetch the restaurantId from req.params
    // check weather restaurantId is valid or not
    // fetch the paticuler restaurant from the Restaurant collection
    // return the restaurent document in response

    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res.send({
        message: "Id is not present*****",
      });
    }

    const isRestaurant = await Restaurant.findById(restaurantId);
    if (!isRestaurant) {
      return res.send({
        message: "There is no any Restaurant with this name",
      });
    }

    return res.send({
      message: `This is Details of ${isRestaurant.name} product`,
      Restaurant: isRestaurant,
    });
  } catch (error) {
    console.log("Error in /food/:id get by id route");
    return res.send({
      message: "Error in /food/:id get food by id",
      error: error.message,
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const data = req.body;
    if (!restaurantId) {
      return res.send({
        message: "Id is not present*****",
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      data
    );
    if (!updatedRestaurant) {
      return res.send({
        message: "There is no any Restaurant with this name",
      });
    }

    return res.send({
      message: `${updatedRestaurant.name} Restaurant is successfully updated `,
      updatedRestaurant: updatedRestaurant,
    });
  } catch (error) {
    console.log("Error in /food/:id in updating the existing food");
    res.send({
      message: "Error in /food/:id in updating the existing food",
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    // fetch restaurantId form req.params
    // validate restaurantId
    // then delete all items releted to this restaurantId
    // and also delete all poduct of this restaurant

    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res.send({
        message: "Id is not present",
      });
    }
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      return res.send({
        message: "There is no any Food with this name",
      });
    }

    // delete all items  releted to this restaurantId

    // delete all product releted to this restaurantId

    return res.send({
      message: `${deletedRestaurant.name} food successfully deleted`,
      deletedRestaurant: deletedRestaurant,
    });
  } catch (error) {
    console.log("Error in /food/:id in deleting route");
    return res.send({
      message: "Error in /food/:id in deleting route",
      error: error.message,
    });
  }
};

const getRestaurantByItemName = async (req, res) => {
  try {
    const { name } = req.params;
    console.log("Name is :", name);
    if (!name) {
      res.send({
        message: "Invalid name",
      });
    }

    const isItem = await Items.findOne({ name: name });
    if (!isItem) {
      return res.send({
        message: "There is no any Item with this name",
      });
    }

    const resList = await Restaurant.find({
      items: { $elemMatch: { name: name } },
    });

    return res.send({
      message: "This is the all Restaurant related to this itemId",
      Restaurants: resList,
    });
  } catch (error) {
    console.log("Error in fetching all restaurant related to this item id");
    return res.send({
      message: "Error in fetching all restaurant related to this item id",
      error: error.message,
    });
  }
};

// const getRestaurantsByItemId = async (itemId) => {
//   try {
//     const restaurants = await Restaurant.find({
//       items: { $elemMatch: { item: itemId } },
//     });

//     return restaurants;
//   } catch (error) {
//     console.error("Error fetching restaurants by itemId:", error.message);
//     throw error;
//   }
// };

router.post("/restaurant", createRestaurant); // Admin only ✅
router.get("/restaurants", getAllRestaurants); // ✅
router.get("/restaurant/:restaurantId", getRestaurantById); // ✅
router.put("/restaurant/:restaurantId", updateRestaurant); // Admin only ✅
router.delete("/restaurant/:restaurantId", deleteRestaurant); // Admin only
router.get("/restaurants/:name", getRestaurantByItemName); // Admin only

//
//
//

const Restaurant2 = require("../models/Restaurant");
const createRestaurant2 = async (req, res) => {
  try {
    // validate the user data
    // check Restaurant is allready exist or not
    // create new restaurant and send response

    const {
      restaurantName,
      location,
      authorName,
      email,
      password,
      mobileNumber,
      category,
      restaurantImage,
    } = req.body;
    if (
      !restaurantName ||
      !location ||
      !authorName ||
      !email ||
      !password ||
      !mobileNumber ||
      !category ||
      !restaurantImage
    ) {
      return res.send({
        message: "Invalid Credential",
      });
    }

    // check weather Restaurant is allready exist or not
    const isName = await Restaurant2.findOne({
      restaurantName: restaurantName,
    });
    if (isName) {
      return res.send({
        message: `${restaurantName} Resturent allready exist`,
      });
    }

    const newRestaurant = new Restaurant2({
      restaurantName,
      location,
      authorName,
      email,
      password,
      mobileNumber,
      category,
      restaurantImage,
    });
    const createdRestaurant = await newRestaurant.save();
    return res.send({
      message: `${restaurantName} newRestaurant created successfully`,
      Resturent: createdRestaurant,
    });
  } catch (error) {
    console.log("Error in /restaurant route");
    return res.send({
      message: "Error in /restaurant route",
      error: error.message,
    });
  }
};

const login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password){
      return res.send({
        message:"Invalid Credential"
      })
    }

    const isRestaurant=await Restaurant2.findOne({email:email});
    if(!isRestaurant){
      return res.send({
        message:"You Don't Have an Account with this email id"
      })
    }

    if(isRestaurant.password!==password){
      return res.send({
        message:"Incorrect Password"
      })
    }

    return res.send({
      message:"Login Successfully",
      restaurant:isRestaurant,
      result:true
    })
  } catch (error) {
    console.log("Error in restaurant login :",error.message);
    return res.send({
      message: "Error in /restaurant2/login route",
      error: error.message,
    });
  }
}

const getAllPendingRestaurants = async (req, res) => {
  try {
    // fetch all restaurant from Restaurant collecton
    // send all restaurant in response

    const restaurantList = await Restaurant2.find({ status: "pending" });
    return res.send({
      message: `this is the all Restaurant list`,
      restaurantList: restaurantList,
    });
  } catch (error) {
    return res.send({
      message: `Error in /food get all food restaurants`,
      error: error.message,
    });
  }
};

const updateRestaurant2 = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const data = req.body;
    if (!restaurantId) {
      return res.send({
        message: "Invalid RestaurantId",
      });
    }

    const updatedRestaurant = await Restaurant2.findByIdAndUpdate(
      restaurantId,
      data
    );
    if (!updatedRestaurant) {
      return res.send({
        result:updateRestaurant,
        message: "There is no any Restaurant with this restaurantId",
      });
    }

    return res.send({
      message: `${updatedRestaurant.restaurantName} Restaurant is successfully updated `,
      updatedRestaurant: updatedRestaurant,
      result:true
    });
  } catch (error) {
    console.log("Error in /food/:id in updating the existing food");
    res.send({
      message: "Error in /food/:id in updating the existing food",
    });
  }
};

const getRestaurantById2=async(req,res)=>{
  try {
    const {restaurantId}=req.params;
    if(!restaurantId){
      return res.send({
        message:"Invalid Credential"
      })
    }

    const isRestaurant=await Restaurant2.findById(restaurantId);
    if(!isRestaurant){
      return res.send({
        message:"There is no any restaurant with this id",
      })
    }

    return res.send({
      message:"Restaurant Found",
      restaurant:isRestaurant,
      result:true
    })
  } catch (error) {
    
  }
}

const getRestaurantByFoodName = async (req, res) => {
  try {
    const { name } = req.params;
    console.log("Name is :", name);
    if (!name) {
      res.send({
        message: "Invalid name",
      });
    }

    const isItem = await Items.findOne({ name: name });
    if (!isItem) {
      return res.send({
        message: "There is no any Item with this name",
      });
    }

    const resList = await Restaurant2.find({
      items: { $elemMatch: { name: name } },
    });

    return res.send({
      message: "This is the all Restaurant related to this itemId",
      Restaurants: resList,
    });
  } catch (error) {
    console.log("Error in fetching all restaurant related to this item id");
    return res.send({
      message: "Error in fetching all restaurant related to this item id",
      error: error.message,
    });
  }
};


router.post("/restaurant2", createRestaurant2); // Admin only ✅
router.post('/restaurant2/login',login);
router.get("/restaurants2", getAllPendingRestaurants); // ✅
router.get("/restaurant2/:restaurantId", getRestaurantById2); // ✅
router.put("/restaurant2/:restaurantId", updateRestaurant2); // Admin only ✅
router.get("/restaurants2/:name", getRestaurantByFoodName); // Admin only

module.exports = router;
