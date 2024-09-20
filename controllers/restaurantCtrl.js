const { validEmail } = require("../middleware/validation");
const Restaurants = require("../models/restaurantModel");

const createRestaurant = async (req, res) => {
	try {
		const { name, location, contactInfo } = req.body;
		const owner = req.user._id

		const alreadyExisting = await Restaurants.findOne({
			"contactInfo.email": contactInfo.email,
		});

		if (alreadyExisting) {
			return res
				.status(400)
				.json({ message: "This restaurant already exist!" });
		}
		if (!validEmail(contactInfo.email)) {
			return res.status(400).json({ message: "email format incorrect" });
		}

		const newRestaurant = new Restaurants({
			name,
			location,
			contactInfo,
			owner
		});

		await newRestaurant.save();

		return res.status(200).json({
			message: "Restaurant Registration Successful",
			restaurant: newRestaurant,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getRestaurants = async (req, res) => {
	const allRestaurants = await Restaurants.find()

	return res.status(200).json({
		message: "Successful",
		count: allRestaurants.length,
		allRestaurants,
	});
};

const getOneRestaurant = async (req, res)=>{
	const {id}=req.params

	const restaurant = await Restaurants.findById(id)

	if(!restaurant) {
		return res.status(404).json({message: "Restaurant not found!"})
	}

	return res.status(200).json({message: "Successful", restaurant})
}

const updateRestaurant = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, location, contactInfo } = req.body;

		if (!validEmail(contactInfo.email)) {
			return res.status(400).json({ message: "email format incorrect" });
		}

		const updatedRestaurant = await Restaurants.findByIdAndUpdate(
			id,
			{ name, location, contactInfo },
			{ new: true }
		);

		return res.status(200).json({ message: "Restaurant updated successfully", updatedRestaurant });

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteRestaurant = async (req, res) => {
	try {
		const { id } = req.params;

		const restaurant = await Restaurants.findById(id)
		const deletedRestaurant = await Restaurants.findByIdAndDelete(id);

		

		return res.status(200).json({ message: `${restaurant.name} Restaurant successfully deleted`});

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant, getOneRestaurant };
