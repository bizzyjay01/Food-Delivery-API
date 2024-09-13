const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		location: { type: String, required: true },
		contactInfo: {
			phone: { type: String, required: true },
			email: { type: String, required: true },
		},
        menu:[{type: mongoose.Schema.Types.ObjectId, ref:'Menus'}],

        owner:[{type: mongoose.Schema.Types.ObjectId, ref:'Users', required:true}]
	},
	{
		timestamps: true,
	}
);

const Restaurants = new mongoose.model("Restaurants", restaurantSchema);

module.exports = Restaurants;
