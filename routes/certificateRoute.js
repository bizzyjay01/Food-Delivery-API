const express = require("express");
const validateCertificateUser = require("../middleware/certificateValidation");
const generateCertificate = require("../controllers/certificate");

const router = express.Router();

router.post("/certificate",validateCertificateUser, generateCertificate)

module.exports = router