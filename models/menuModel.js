const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
	{
		itemName: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		availability: { type: Boolean, default: true },

		restaurantId:{type: mongoose.Schema.Types.ObjectId, ref:'Restaurants', required:true}
	},
	{
		timestamps: true,
	}
);

const Menus = new mongoose.model("Menus", menuSchema);

module.exports = Menus;