const express = require("express");

const { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant, getOneRestaurant } = require("../controllers/restaurantCtrl");
const { validateToken } = require("../middleware/validateAuth");
const { validateRestaurant, authorizeRestaurantOwner } = require("../middleware/restaurantValidation");



const router = express.Router();

// Create Restaurant
router.post("/create-restaurant", validateToken,validateRestaurant, createRestaurant);

// Read Restaurant
router.get("/all-restaurants", validateToken, getRestaurants)

router.get("/restaurant/:id", validateToken, getOneRestaurant)

// Update Restaurant
router.put("/edit-restaurant/:id", validateToken,authorizeRestaurantOwner, updateRestaurant)

// Delete Restaurant
router.delete("/delete-restaurant/:id", validateToken,authorizeRestaurantOwner, deleteRestaurant)



module.exports = router