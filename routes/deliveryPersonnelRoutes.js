const express = require("express")
const { validateToken } = require("../middleware/validateAuth")
const { createDeliveryPersonnel, assignDeliveryPersonnel } = require("../controllers/deliveryPersonnelCtrl")
const { validateDeliveryPersonnel } = require("../middleware/deliveryPersonnelValidation")


const router = express.Router()

// Create delivery personnel
router.post("/delivery-personnel", validateToken, validateDeliveryPersonnel, createDeliveryPersonnel)

// Assign delivery personnel to order
router.post("/orders/assign-delivery", validateToken, assignDeliveryPersonnel)



module.exports = router