const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: ["customer", "restaurant owner", "delivery personnel"],
		},

		isActive:{type:Boolean, default:false}
	},
	{
		timestamps: true,
	}
);


const Users = new mongoose.model("Users", authSchema);
module.exports = Users;
