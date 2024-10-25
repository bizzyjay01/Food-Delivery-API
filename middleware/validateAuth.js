const jwt = require("jsonwebtoken");
const Users = require("../models/authModel");

const validateToken = async (req, res, next) => {
	try {
		const authHeader = req.header("Authorization");
		const tokenParts = authHeader.split(" ");
		const token = tokenParts[1];

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

		if (!decoded) {
			return res.status(400).json({ message: "Invalid login details" });
		}
		// console.log({decoded});

		const user = await Users.findOne({ _id: decoded.user._id });

		if (!user) {
			return res.status(404).json({ message: "User account not found" });
		}

		req.user = user;
		next();

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	validateToken
}