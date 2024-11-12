// User Routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/profile/:id", getUserProfile);
router.put("/user/profile/:id", updateUserProfile);
router.post("/user/logout", logoutUser);

// foods
rotuer.post("/food", createFood);
router.get("/food", getAllFoods);
router.get("/food/:id", getFoodById);
router.put("/food/:id", updateFood);
router.delete("/food/:id", deleteFood);

// Restaurant Routes
router.post("/restaurant", createRestaurant); // Admin only ✅
router.get("/restaurants", getAllRestaurants); // ✅
router.get("/restaurant/:id", getRestaurantById); // ✅
router.put("/restaurant/:id", updateRestaurant); // Admin only // ✅
router.delete("/restaurant/:id", deleteRestaurant); // Admin only

// Item (Menu) Routes
router.post("/restaurant/:id/item", addItemToRestaurant); // Admin only // ✅
router.get("/restaurant/:id/items", getAllItemsForRestaurant); // ✅
router.get("/item/:id", getItemById); // ✅
router.put("/item/:id", updateItem); // Admin only // ✅
router.delete("/item/:id", deleteItem); // Admin only

// products
rotuer.post("/products", createproducts); // ✅
router.get("/products", getAllproducts); // ✅
router.get("/products/:id", getproductsById); // ✅
router.put("/products/:id", updateproducts); // ✅
router.delete("/products/:id", deleteproducts);

// Order Routes
router.post("/order", placeOrder);
router.get("/order/:id", getOrderById);
router.get("/orders/user/:userId", getAllOrdersForUser);
router.put("/order/:id", updateOrderStatus); // Admin or restaurant staff only
router.delete("/order/:id", cancelOrder);

// Cart Routes (Optional)
router.post("/cart", addToCart);
router.get("/cart/:userId", getCartByUserId);
router.put("/cart/:userId", updateCart);
router.delete("/cart/:userId/item/:itemId", removeItemFromCart);

// Payment Routes (Optional)
router.post("/payment", processPayment);
router.get("/payment/:id", getPaymentDetails);
router.put("/payment/:id", updatePaymentStatus);

// admin dashboard

// user profile

// searchBar