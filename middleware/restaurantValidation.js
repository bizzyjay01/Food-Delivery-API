// Restaurant Validation
const Restaurants = require("../models/restaurantModel");

const validateRestaurant = async (req, res, next) => {
	try {
		const { name, location, contactInfo } = req.body;
		const errors = [];

		if (!name) {
			errors.push("Please add restaurant's name");
		}
		if (!location) {
			errors.push("Please add restaurant's location");
		}
		if (!contactInfo.email) {
			errors.push("Please add restaurant's email");
		}
		if (!contactInfo.phone) {
			errors.push("Please add restaurant's phone");
		}

		if (errors.length > 0) {
			return res.status(400).json({ message: errors });
		}

		next();

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	
};

// Check
const authorizeRestaurantOwner = async (req, res, next) => {
	const { id } = req.params;

	// const errors = [];

	try {
		const restaurant = await Restaurants.findById(id);

		if (!restaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}

		if (restaurant.owner.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({
					message:
						"You do not have permission to update or delete this restaurant",
				});
		}

		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	validateRestaurant,
	authorizeRestaurantOwner,
};
