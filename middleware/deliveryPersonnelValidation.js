const validateDeliveryPersonnel = async (req, res, next) => {
	try {
		const { name, contactInfo, vehicleDetails } = req.body;
		const errors = [];

		if (!name) {
			errors.push("Please add personnel's name");
		}

		if (!contactInfo.email) {
			errors.push("Please add email");
		}
		if (!contactInfo.phone) {
			errors.push("Please add phone");
		}
		if (!vehicleDetails.type) {
			errors.push("Please add vehicle type");
		}
		if (!vehicleDetails.plateNumber) {
			errors.push("Please add vehicle plate number");
		}

		if (errors.length > 0) {
			return res.status(400).json({ message: errors });
		}

		next();

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	
};

const validateAssignPersonnel = async (req, res)=>{
	

}

module.exports = {
	validateDeliveryPersonnel
}