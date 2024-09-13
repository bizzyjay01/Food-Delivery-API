const express = require("express");
const { validateToken } = require("../middleware/validateAuth");
const { createMenu } = require("../controllers/menuCtrl");

const router = express.Router();

router.post("/restaurants/:restaurantId/menu", validateToken, createMenu);
router.get(" ")

module.exports = router;
