const DeliveryPersonnels = require("../models/deliveryPersonnelModel");
const Orders = require("../models/orderModel");

const createDeliveryPersonnel = async (req, res) => {
	try {
		const { name, contactInfo, vehicleDetails } = req.body;

		const existingPersonnel = await DeliveryPersonnels.findOne({
			"contactInfo.email": contactInfo.email,
		});

		if (existingPersonnel) {
			return res
				.status(400)
				.json({ message: "Delivery Personnel already exist!" });
		}

		const newPersonnel = new DeliveryPersonnels({
			name,
			contactInfo,
			vehicleDetails,
		});

		await newPersonnel.save();

		return res.status(201).json({
			message: "Delivery personnel created successfully",
			personnel: newPersonnel,
		});

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};


// Assign delivery personnel to an order
const assignDeliveryPersonnel = async (req, res)=>{
	try {
		const {orderId, deliveryPersonnelId} = req.body
		
		const deliveryPersonnel = await DeliveryPersonnels.findById(deliveryPersonnelId)

		if(!deliveryPersonnel){
			return res.status(404).json({message: "Delivery Personnel not found"})
		}
		if(deliveryPersonnel.currentStatus !=="available"){
			return res.status(404).json({message: "Delivery Personnel not available. Kindly assign another personnel to the order"})
		}

		const order = await Orders.findById(orderId)

		// Assign delivery personnel to order
		order.deliveryPersonnel = deliveryPersonnelId

		// update order schema
		order.orderStatus = "preparing"
		
		await order.save()

		// Update Delivery personnel schema
		deliveryPersonnel.assignedOrders = orderId

		deliveryPersonnel.currentStatus="on delivery"
		deliveryPersonnel.deliveryStatus="assigned"

		await deliveryPersonnel.save()

		return res.status(200).json({
			message: "Delivery personnel assigned to order successfully.",
			order,
			deliveryPersonnel
		})



	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}


module.exports = {
	createDeliveryPersonnel,assignDeliveryPersonnel
};
