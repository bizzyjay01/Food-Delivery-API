const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},

		restaurantId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Restaurants",
			required: true,
		},

		orderedItems: [
			{
				menuItem: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Menus",
					required: true,
				},
				quantity: { type: Number, required: true, min: 1 },
			},
		],

		totalCost: {
			type: Number,
			required: true,
		},

		orderStatus: {
			type: String,
			enum: ["pending", "preparing", "out for delivery", "delivered"],
			required: true,
		},

		deliveryPersonnel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "DeliveryPersonnel",
			default: null,
		},
		
	},
	{
		timestamps: true,
	}
);

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;
