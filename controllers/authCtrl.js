const Users = require("../models/authModel");
const bcrypt = require("bcrypt");
const { sendUserEmail } = require("../sendEmail");
const jwt = require("jsonwebtoken");

const registerFxn = async (req, res) => {
	try {
		const { name, username, email, password, role } = req.body;

		const allowedRoles = ["customer", "restaurant owner", "delivery personnel"];
		if (!allowedRoles.includes(role)) {
			return res.status(400).json({ message: "Invalid user role" });
		}

		const existingUser = await Users.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: "User Account already exist!" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new Users({
			name,
			username,
			email,
			password: hashedPassword,
			role,
			isActive: false,
		});

		await newUser.save();

		const activationToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACTIVE_TOKEN,
			{ expiresIn: "1h" }
		);

		const activationLink = `${process.env.BASE_URL}/activate/${activationToken}`;

		await sendUserEmail(email, activationLink);

		return res.status(200).json({
			message:
				"User registered successfully, Please check your email to activate your account.",
			activationToken,
			user: newUser,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const activateFxn = async (req, res) => {
	const { token } = req.params;

	try {
		const decoded = jwt.verify(token, process.env.ACTIVE_TOKEN);

		const user = await Users.findOne({ _id: decoded.userId });

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid or expired activation token" });
		}
		if (user.isActive) {
			return res
				.status(400)
				.json({ message: "Account already activated" });
		}

		user.isActive = true;
		await user.save();

		res.status(200).json({ message: "Account activated successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const loginfxn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "User account not found" });
		}
		if(!user.isActive) {
			return res.status(400).json({ message: "Please activate your account first" });
		}

		const isMatched = await bcrypt.compare(password, user.password);

		if (!isMatched) {
			return res.status(400).json({ message: "Incorrect password or email" });
		}

		const accessToken = jwt.sign({ user }, `${process.env.ACCESS_TOKEN}`, {
			expiresIn: "3h",
		});

		res.status(200).json({
			message: "Login successful",
			accessToken,
			user,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const authenticateUser = async (req,res)=>{
	res.status(200).json({message:"Successful", user:req.user})
}



module.exports = {
	registerFxn,
	activateFxn,
	loginfxn,
	authenticateUser
};
