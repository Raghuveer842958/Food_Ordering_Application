const express = require("express");
const router = express.Router();
const Item = require("../models/items2");
const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product2");

const createproduct = async (req, res) => {
  try {
    const { name, image, price } = req.body;
    const { restaurantId, itemId } = req.params;

    if (!name || !image || !price || !restaurantId || !itemId) {
      return res.send({
        message: `Invalid creadential`,
      });
    }

    const isRestaurant = await Restaurant.findById(restaurantId);
    if (!isRestaurant) {
      return res.send({
        message: "Invalid Restaurant id",
      });
    }

    const isItem = await Item.findById(itemId);
    if (!isItem) {
      return res.send({
        message: "Invalid Item id",
      });
    }

    const newProduct = new Product({
      name,
      image,
      price,
      itemId,
      restaurantId,
    });

    const createdProduct = await newProduct.save();
    const updatedList = isItem?.products.push(createdProduct._id);
    // console.log("Updated list is :", isItem?.products);
    const updatedItem = await isItem.save();

    return res.send({
      message: `${name} successfull added`,
      product: createdProduct,
      itemList: updatedItem,
      result:true
    });
  } catch (error) {
    console.log("Error in creating product router");
    return res.send({
      message: "Error in creating product",
      error: error.message,
    });
  }
};

const getAllproducts = async (req, res) => {
  try {
    const productList = await Product.find();
    return res.send({
      message: "All Product List",
      productList: productList,
    });
  } catch (error) {
    console.log("Error in Fetching all product cart");
    return res.send({
      message: "Error in fetching all product cart",
      error: error.message,
    });
  }
};

const getproductsById = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.send({
        message: "There is no any Product with this id",
      });
    }

    const isProduct = await Product.findById(productId);
    if (!isProduct) {
      return res.send({
        message: "There is no any product with releted to this productId",
      });
    }

    return res.send({
      message: "Product Found",
      product: isProduct,
    });
  } catch (error) {}
};

const getproductsByItemId = async (req, res) => {
  try {
    const { itemId, restaurantId } = req.params;
    if (!itemId || !restaurantId) {
      return res.send({
        message: "There is no any product with this itemId or restaurantId",
      });
    }

    // Mongoose query to find products matching the criteria
    const productList = await Product.find({
      itemId: itemId,
      restaurantId: restaurantId,
    });

    return res.send({
      message: "All Product List......",
      productList: productList,
    });
  } catch (error) {}
};

const updateproducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    if (!productId) {
      return res.send({
        message: "Invalid ProductId",
      });
    }

    const isProduct = await Product.findByIdAndUpdate(productId, data);
    if (!isProduct) {
      return res.send({
        message: "There is no any product with this id",
      });
    }

    return res.send({
      message: `${isProduct?.name} is Successfully Updated`,
      updatedProduct: isProduct,
      result:true
    });
  } catch (error) {
    console.log("Error in updating product cart");
    return res.send({
      message: "Error in updating product cart",
      error: error.message,
    });
  }
};

const deleteproducts = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.send({
        message: "Invalid ProductId",
      });
    }

    const isProduct = await Product.findByIdAndDelete(productId);
    if (!isProduct) {
      return res.send({
        message: "Product Not Found",
        response: isProduct,
        result: false,
      });
    }

    return res.send({
      message: "item Deleted Successfully",
      response: isProduct,
      result: true,
    });
  } catch (error) {
    console.log("Error in deleting product :", error.message);
  }
};

const getAllProductsOfRestaurant=async(req,res)=>{
  try {
    console.log("Inside ***********************")
    const {restaurantId}=req.params;
    if(!restaurantId){
      return res.send({
        message:"Invalid restaurantId"
      })
    }

    const isRestaurant=await Restaurant.findById(restaurantId);
    if(!isRestaurant){
      return res.send({
        message:"No Restaurant Found With this restaurantId"
      })
    }

    const productList=await Product.find({restaurantId:restaurantId});
    return res.send({
      message:"This is The Restaurant Item List",
      productList:productList,
      result:true
    })
  } catch (error) {
    console.log("Error in getting all Products of any restaurant :",error.message);
  }
}

router.post("/product/create/:restaurantId/:itemId", createproduct); // ✅
router.get("/products", getAllproducts); // ✅
router.get("/product/:productId", getproductsById); // ✅
router.get("/product/:restaurantId/:itemId", getproductsByItemId); // ✅
// router.get("/product/resAllProduct/:restaurantId", getAllProductsOfRestaurant); // ✅
router.get('/product123/allRestaurantProducts/:restaurantId',getAllProductsOfRestaurant);
router.put("/product/:productId", updateproducts); // ✅
router.delete("/product/:productId", deleteproducts);

module.exports = router;
