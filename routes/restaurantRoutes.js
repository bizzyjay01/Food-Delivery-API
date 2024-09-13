const express = require("express");

const { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant } = require("../controllers/restaurantCtrl");
const { validateToken } = require("../middleware/validateAuth");
const { authorizeRestaurantOwner } = require("../middleware/validation");


const router = express.Router();

// Create Restaurant
router.post("/create-restaurant", validateToken, createRestaurant);

// Read Restaurant
router.get("/all-restaurants", getRestaurants)

// Update Restaurant
router.put("/edit-restaurant/:id", validateToken,authorizeRestaurantOwner, updateRestaurant)

// Delete Restaurant
router.post("/delete-restaurant/:id", validateToken,authorizeRestaurantOwner, deleteRestaurant)



module.exports = router