const express = require("express");
const router = express.Router();
const Item = require("../models/items2");
const Restaurant = require("../models/ResturentModel");
const Restaurant2 = require("../models/Restaurant");

const addItemToRestaurant = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { restaurantId } = req.params;
    if (!name || !restaurantId || !image) {
      return res.send({
        message: "Enter all creanditial properly",
      });
    }

    const isRestaurant = await Restaurant2.findById(restaurantId);
    if (!isRestaurant) {
      return res.send({
        message: "There is no any Restaurat with this id",
      });
    }

    const itemList = isRestaurant.items;

    const isItem = itemList.filter((d) => d?.name === name);
    if (isItem.length !== 0) {
      return res.send({
        message: `${name} is allready exist in this Restaurant Menue`,
        item: isItem[0],
      });
    }

    const newItem = new Item({ name, image, restaurantId });
    const createdItem = await newItem.save();
    const newObj = {
      name: name,
      image: image,
      item: createdItem._id,
    };
    isRestaurant.items.push(newObj);
    const updatedRestaurant = await isRestaurant.save();

    return res.send({
      message: `${name} successfully added to ${isRestaurant?.name}`,
      response: createdItem,
      updatedResItems: updatedRestaurant,
      result: true,
    });
  } catch (error) {
    console.log("Error in /item route");
    return res.send({
      message: "Error in /item route",
      error: error.message,
    });
  }
};

const getAllItemsForRestaurant = async (req, res) => {
  try {
    const { restaurentId } = req.params;
    if (!restaurentId) {
      return res.send({
        message: "Invalid RestaurentId",
      });
    }
    const isRestaurant = await Restaurant.findById(restaurentId);
    if (!isRestaurant) {
      return res.send({
        message: "There is no any Restaurent with this id",
      });
    }
    const itemList = isRestaurant?.items;
    return res.send({
      message: `this is the all ${isRestaurant?.name} item list`,
      itemList: itemList,
    });
  } catch (error) {
    return res.send({
      message: `Error in /food get all food roues`,
      error: error.message,
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      return res.send({
        message: "Invalid restaurentId",
      });
    }
    const isItem = await Item.findById(itemId);
    if (!isItem) {
      return res.send({
        message: "There is no any Item with this name",
      });
    }
    return res.send({
      message: `This is Details of ${isItem?.name} product`,
      Item: isItem,
    });
  } catch (error) {
    console.log("Error in /food/:id get by id route");
    return res.send({
      message: "Error in /food/:id get food by id",
      error: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { restaurentId, itemId } = req.params;
    const data = req.body;

    if (!restaurentId) {
      return res.send({
        message: "restaurentId is not present",
      });
    }

    if (!itemId) {
      return res.send({
        message: "itemId is not present",
      });
    }

    const isRestaurant = await Restaurant2.findById(restaurentId);
    if (!isRestaurant) {
      return res.send({
        message: "There is no any Restaurant with this id",
      });
    }

    const itemList = isRestaurant.items;
    let filteredList = itemList.filter((d) => {
      console.log("item is :", d);
      if (d.item.toString() === itemId) {
        return d;
      }
    });

    if (filteredList.length === 0) {
      return res.send({
        message: "Restaurant Don't Have This Item",
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(itemId, data, {
      new: true,
    });

    if (!updatedItem) {
      return res.send({
        message: "There is no any Item with this id",
      });
    }

    const newItem = {
      name: updatedItem.name,
      image: updatedItem.image,
      item: updatedItem._id,
    };

    filteredList = itemList.filter((d) => d.item.toString() !== itemId);
    filteredList.push(newItem);
    isRestaurant.items = filteredList;
    const updatedRestaurantItems = await isRestaurant.save();

    return res.send({
      message: `${updatedItem.name} Food is successfully updated `,
      updatedItem: updatedItem,
      updatedRestaurantItems: updatedRestaurantItems,
      result: true,
    });
  } catch (error) {
    console.log("Error in /food/:id :", error.message);
    res.send({
      message: "Error in /food/:id in updating the existing food",
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { restaurentId, itemId } = req.params;
    if (!restaurentId) {
      return res.send({
        message: "restaurentId is not present",
      });
    }

    if (!itemId) {
      return res.send({
        message: "itemId is not present",
      });
    }

    const isRestaurant = await Restaurant2.findById(restaurentId);
    if (!isRestaurant) {
      return res.send({
        message: "There is no any Restaurant with this id",
      });
    }

    const itemList = isRestaurant.items;
    let filteredList = itemList.filter((d) => d.item.toString() === itemId);

    if (filteredList.length === 0) {
      return res.send({
        message: "Restaurant Don't Have This Item",
      });
    }

    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.send({
        message: "There is no any Food with this name",
      });
    }

    filteredList = itemList.filter((d) => d.item.toString() !== itemId);
    isRestaurant.items = filteredList;
    const updatedRestaurantItems = await isRestaurant.save();

    return res.send({
      message: `${deletedItem.name} food successfully deleted`,
      deletedItem: deletedItem,
      updatedRestaurantItems: updatedRestaurantItems,
      result: true,
    });
  } catch (error) {
    console.log("Error in /food/:id in deleting route");
    return res.send({
      message: "Error in /food/:id in deleting route",
      error: error.message,
    });
  }
};

const getUniqueItems = async (req, res) => {
  try {
    const uniqueItems = await Item.aggregate([
      {
        $group: {
          _id: "$name", // Group by the 'name' field to filter unique items
          firstItem: { $first: "$$ROOT" }, // Get the first document for each unique name
        },
      },
      {
        $replaceRoot: { newRoot: "$firstItem" }, // Replace the root with the first document of the group
      },
    ]);

    console.log(uniqueItems);
    return res.send({
      message: "This is unique item list",
      list: uniqueItems,
    });
  } catch (error) {
    console.error(error);
  }
};

router.post("/item/add/:restaurantId", addItemToRestaurant); // Admin only ✅
router.get("/items/get/:restaurentId", getAllItemsForRestaurant); // ✅
router.get("/item/get/:itemId", getItemById); // ✅
router.put("/item/update/:restaurentId/:itemId", updateItem); // Admin only ✅
router.delete("/item/delete/:restaurentId/:itemId", deleteItem); // Admin only  /item/add/:restaurantId
router.get("/item/unique", getUniqueItems);

module.exports = router;
