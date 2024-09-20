const express = require("express")
const { trackAndUpdateDeliveryStatus } = require("../controllers/trackDelivery")
const { validateToken } = require("../middleware/validateAuth")

const router = express.Router()

router.post("/orders/:orderId/delivery-status", validateToken, trackAndUpdateDeliveryStatus)

module.exports = router