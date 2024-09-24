const Users = require("../models/authModel");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const { sendCertificateEmail } = require("../sendEmail");

const generateCertificate = async (req, res) => {
	try {
		const {email} = req.body

		const user = await Users.findOne({email})

		const doc = new PDFDocument({
			layout: "landscape",
			size: "A4",
		});

		doc.pipe(fs.createWriteStream("./certificate/certificate.pdf"));

		doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

		const distanceMargin = 18;
		doc
			.fillAndStroke("#2a9d8f")
			.lineWidth(20)
			.lineJoin("round")
			.rect(
				distanceMargin,
				distanceMargin,
				doc.page.width - distanceMargin * 2,
				doc.page.height - distanceMargin * 2
			)
			.stroke();

		const maxWidth = 140;
		const maxHeight = 70;
		doc.image("careerExLogo.jpg", doc.page.width / 2 - maxWidth / 2, 60, {
			fit: [maxWidth, maxHeight],
			align: "center",
		});

		const jumpLine = (doc, lines) => {
			for (let index = 0; index < lines; index++) {
				doc.moveDown();
			}
		};
		jumpLine(doc, 5);

		doc
			.fontSize(20)
			.fill("#495057")
			.text("Youthrive by access", {
				align: "center",
			});

		jumpLine(doc, 2);

		doc
			.fontSize(25)
			.fill("#0d1b2a")
			.text("CERTIFICATE OF PARTICIPATION", {
				align: "center",
			});

		jumpLine(doc, 1);

		doc
			.fontSize(20)
			.fill("#495057")
			.text("This is to certify that", {
				align: "center",
			});


		jumpLine(doc, 1);

		
		doc
			.fontSize(30)
			.fill("#0d1b2a")
			.text(`${user.name.toUpperCase()}`, {
				align: "center",
			});

		jumpLine(doc, 1);

		doc
			.fontSize(20)
			.fill("#495057")
			.text("Participated in the 3 months Youthrive Tech Program", {
				align: "center",
			});
	

		doc.end();

		sendCertificateEmail(email)

		return res
			.status(200)
			.json({ message: "Certificate successfully generated. Check email to download" });

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = generateCertificate;
