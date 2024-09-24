const Users = require("../models/authModel");

const validateCertificateUser = async (req, res, next) => {
	try {
		const { email } = req.body;

		if (!email) {
			res.status(400).json({ messae: "Please add email" });
		}

		const user = await Users.findOne({ email });
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
        next()

	} catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = validateCertificateUser
