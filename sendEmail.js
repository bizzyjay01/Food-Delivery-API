const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// Email activation
const sendUserEmail = async (userEmail, activationLink) => {
	try {
		const mailTransporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const detailsToSend = {
			from: process.env.EMAIL,
			to: userEmail,
			subject: "Activate your account",
			html: `
                <h1>Welcome</h1>
                <p>Thank you for registering. Please click the link below to activate your account:</p>
                <a href="${activationLink}">Activate Account</a>
            `
		};

        const result = await mailTransporter.sendMail(detailsToSend)
        return result

	} catch (error) {
        console.log("Error sending email", error)
    }
};


const sendCertificateEmail = async(userEmail) =>{
	try {
		const mailTransporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const detailsToSend = {
			from: process.env.EMAIL,
			to: userEmail,
			subject: "Certificate of Participation",
			html: `
                <h1>Congratulations</h1>
                <p>You have successfully completed the three month youthrive program. Kindly download your certificate</p>
            `,

			attachments: [
				{
				  filename: 'certificate.pdf',
				  path: "./certificate/certificate.pdf", 
				  contentType: 'application/pdf',
				},
			  ],
		};

        const result = await mailTransporter.sendMail(detailsToSend)
        return result

	} catch (error) {
        console.log("Error sending email", error)
    }
}

module.exports = {sendUserEmail, sendCertificateEmail}