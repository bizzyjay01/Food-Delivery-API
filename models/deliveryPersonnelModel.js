const mongoose = require("mongoose");

const deliveryPersonnelSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		contactInfo: {
			phone: { type: String, required: true },
			email: { type: String, required: true },
		},
		vehicleDetails: {
            type: { type: String, required: true },
            plateNumber: {type:String, required:true}
        },

		currentStatus: {
			type: String,
			enum: ["available", "on delivery", "off duty"],
			default: "available",
		},

		assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],

		deliveryStatus: {
			type: String,
			enum: ["awaiting assignment", "assigned", "taken off", "delivered"],
			default: "awaiting assignment",
		},
	},
	{
		timestamps: true,
	}
);

const DeliveryPersonnels = new mongoose.model("DeliveryPersonnels", deliveryPersonnelSchema)

module.exports = DeliveryPersonnels
