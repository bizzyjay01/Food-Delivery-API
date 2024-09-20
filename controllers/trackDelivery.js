const DeliveryPersonnels = require("../models/deliveryPersonnelModel");
const Orders = require("../models/orderModel");

const trackAndUpdateDeliveryStatus = async (req, res) => {
	try {
		const { orderId } = req.params;

		const { status } = req.body;

		// Find the order
		const order = await Orders.findById(orderId);

		const deliveryPersonnel = await DeliveryPersonnels.findById(
			order.deliveryPersonnel
		);
        if (!deliveryPersonnel) {
			return res.status(404).json({ message: "personnel not found" });
		}
        console.log(deliveryPersonnel)

		if (!order) {
			return res.status(404).json({ message: "Order not found." });
		}

		// Update delivery status
		deliveryPersonnel.deliveryStatus = status;

		if (status === "taken off") {
			order.orderStatus = "out for delivery";
            deliveryPersonnel.deliveryStatus="taken off"
            deliveryPersonnel.currentStatus="on delivery"
		}
		if (status === "delivered") {
			order.orderStatus = "delivered";
            deliveryPersonnel.deliveryStatus="delivered"

			// Free up delivery personnel after delivery, to make him available for the next order.
			deliveryPersonnel.currentStatus = "available";
		}

		await order.save();
        await deliveryPersonnel.save();

		return res.status(200).json({
			message: "Order delivery status updated successfully",
			order,
		});

	} catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {trackAndUpdateDeliveryStatus}