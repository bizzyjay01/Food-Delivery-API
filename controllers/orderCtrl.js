const Menus = require("../models/menuModel");
const Orders = require("../models/orderModel");
const Restaurants = require("../models/restaurantModel");

const placeOrder = async (req, res) => {
	try {
		const { restaurantId, orderedItems } = req.body;

		const userId = req.user._id;

		restaurant = await Restaurants.findById(restaurantId);

		if (!restaurant) {
			return res.status(400).json({ message: "Restaurant not found" });
		}

		// Calculate total cost and validate menu items
		let totalCost = 0;

		for (const item of orderedItems) {
			const menuItem = await Menus.findById(item.menuItem);

			if (!menuItem) {
				return res.status(400).json({ message: "Invalid menu item" });
			}
			if (item.quantity <= 0) {
				return res.status(400).json({ message: "Invalid quantity" });
			}

			totalCost = totalCost + menuItem.price * item.quantity;
		}

		const newOrder = new Orders({
			userId,
			restaurantId,
			orderedItems,
			totalCost,
			orderStatus: "pending",
		});

		await newOrder.save();

		return res.status(201).json({
			message: "Order placed successfully",
			order: newOrder,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// Check order history of user
const viewOrderHistory = async (req, res) => {
	try {
		const userId = req.user._id;

		const orders = await Orders.find({ userId }).populate({
			path: "orderedItems.menuItem",
			select: "itemName description price availability",
		});

		const orderedItems = await Orders.find({ userId });

		return res.status(200).json({
			message: "Order history retrieved successfully",
			count: orderedItems.length,
			orders,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const trackOrderStatus = async (req, res) => {
	const { orderId } = req.params;

	const order = await Orders.findById(orderId).populate([
		{
			path: "orderedItems.menuItem",
			select: "itemName description price availability",
		},
		{
			path:"restaurantId",
			select:"name location"
		}
	]);

	if (!order) {
		return res.status(404).json({ message: "Order not found" });
	}

	if (order.userId.toString() !== req.user._id.toString()) {
		return res
			.status(403)
			.json({ message: "You do not have permission to view this order" });
	}

	return res.status(200).json({
		message: "Order Status retrieved successfully",
		orderStatus: order.orderStatus,
		order,
	});
};


module.exports = {
	placeOrder,
	viewOrderHistory,
	trackOrderStatus,
};
