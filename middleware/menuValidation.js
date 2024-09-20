const validateMenu = async (req, res, next) => {
	try {
		const { itemName, description, price, availability } = req.body;

		errors = [];

		if (!itemName) {
			errors.push("Please add item name");
		}
		if (!description) {
			errors.push("Please add description");
		}
		if (!price) {
			errors.push("Price of item is empty");
		}
		if (!availability) {
			errors.push("Availabilty of item is required");
		}

		if (errors.length > 0) {
			res.status(400).json({ message: errors });
		}
        
        next();

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	
};

module.exports = {
	validateMenu,
};
