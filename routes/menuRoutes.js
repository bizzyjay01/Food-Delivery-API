const express = require("express");
const { validateToken } = require("../middleware/validateAuth");
const { createMenu, getMenus, getOneMenu, updateMenu, deleteMenu } = require("../controllers/menuCtrl");
const { validateMenu } = require("../middleware/menuValidation");

const router = express.Router();

// Create Menu
router.post("/restaurants/:restaurantId/menu", validateToken, validateMenu, createMenu);

// Read Menus
router.get("/all-menus", getMenus)
router.get("/menu/:id",validateToken, getOneMenu)

// Update Menu
router.put("/edit-menu/:id",validateToken, updateMenu)

// Delete Menu
router.delete("/delete-menu/:id", validateToken, deleteMenu)



module.exports = router;
