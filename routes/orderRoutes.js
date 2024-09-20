const express = require("express");
const { placeOrder, viewOrderHistory, trackOrderStatus } = require("../controllers/orderCtrl");
const { validateToken } = require("../middleware/validateAuth");

const router = express.Router()

// Place order route
router.post("/order",validateToken, placeOrder)

// View order history
router.get("/orders",validateToken, viewOrderHistory)

// track order status
router.get("/order/:orderId/status", validateToken, trackOrderStatus)


module.exports = router

