const express = require("express");
const {
	registerFxn,
	activateFxn,
	loginfxn,
	authenticateUser,
} = require("../controllers/authCtrl");
const {
	validateRegistration,
	validateLogin,
} = require("../middleware/validation");
const { validateToken } = require("../middleware/validateAuth");


const router = express.Router();

router.post("/register", validateRegistration, registerFxn);

router.post("/login", validateLogin, loginfxn);

// activation endpoint
router.get("/activate/:token", activateFxn);

router.post("/auth", validateToken, authenticateUser);


module.exports = router;
