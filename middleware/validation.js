const validateRegistration = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const errors = [];

		if (!email) {
			errors.push("Please add email");
		}

		if (password.length < 8) {
			errors.push("Password should be minimum of eight characters");
		}

		if (errors.length > 0) {
			return res.status(400).json({ message: errors });
		}

		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const validateLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const errors = [];

		if (!email) {
			errors.push("Please add your email");
		} else if (!validEmail(email)) {
			errors.push("Incorrect email format");
		}
		if (!password) {
			errors.push("Please add your password");
		}

		if (errors.length > 0) {
			return res.status(400).json({ message: errors });
		}

		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};



// validate email with regex
const validEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};


module.exports = {
	validateRegistration,
	validateLogin,
	validEmail,
};


