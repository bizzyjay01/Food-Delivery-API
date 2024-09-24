const express = require("express");
const validateCertificateUser = require("../middleware/certificateValidation");
const generateCertificate = require("../controllers/certificate");
const { validateToken } = require("../middleware/validateAuth");

const router = express.Router();

router.post("/certificate", validateToken, validateCertificateUser, generateCertificate)

module.exports = router