const Users = require("../models/authModel")
const { pagination } = require("../utilities")

const getUsers = async (req, res) =>{
    try {
        const {page, limit, skip} = pagination(req)

        const users = await Users.find().sort({createdAt:-1}).limit(limit).skip(skip)
        //{createdAt:-1} implies 'the last user created will come first"
        return res.status(200).json({
            message:"Successful",
            count: users.length,
            page,
            limit,
            users
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {getUsers}