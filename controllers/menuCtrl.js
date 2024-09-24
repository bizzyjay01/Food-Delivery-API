const Menus = require("../models/menuModel");
const Restaurants = require("../models/restaurantModel");

// The createMenu function is designed to create a new menu item and associate it with a specific restaurant

const createMenu = async (req, res) => {
	try {
		const { restaurantId } = req.params;

		const { itemName, description, price, availability } = req.body;

		const restaurant = await Restaurants.findById(restaurantId);

		if (!restaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}

		const newMenu = new Menus({
			itemName,
			description,
			price,
			availability,
			restaurantId,
		});

		await newMenu.save();

		// Add the new menu item to the restaurant's menu
		// console.log(newMenu)

		restaurant.menu.push(newMenu);

		await restaurant.save();

		// restaurant.populate("menu").then((r) => {
		// 	console.log(r);
		// 	console.log(r.menu);
		// 	console.log(r.menu[0]);
		// });

		res.status(201).json({
			message: "Menu item created successfully",
			menu: newMenu,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getMenus = async (req, res) => {
	try {
		const allMenus = await Menus.find();

		return res.status(200).json({
			message: "Successful",
			count: allMenus.length,
			allMenus,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getOneMenu = async (req, res) => {
	try {
		const { id } = req.params;

		const menu = await Menus.findById(id);

		if (!menu) {
			return res.status(404).json({ message: "Menu not found!" });
		}

		return res.status(200).json({ message: "Successful", menu });
		
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateMenu = async (req, res) => {
	try {
		const { id } = req.params;
		const { itemName, description, price, availability } = req.body;

		const updatedMenu = await Menus.findByIdAndUpdate(
			id,
			{ itemName, description, price, availability },
			{ new: true }
		);

		return res
			.status(200)
			.json({ message: "Menu updated successfully", updatedMenu });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteMenu = async (req, res) => {
	try {
		const { id } = req.params;

		const menu = await Menus.findById(id);
		const deletedMenu = await Menus.findByIdAndDelete(id);

		return res
			.status(200)
			.json({ message: `${menu.itemName} Menu successfully deleted` });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { createMenu, getMenus, getOneMenu, updateMenu, deleteMenu };
