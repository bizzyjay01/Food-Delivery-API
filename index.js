const express = require("express")
const connectDB = require("./db")
const dotenv = require("dotenv").config()
const authRouter = require("./routes/authRoutes")
const restaurantRouter = require("./routes/restaurantRoutes")
const menuRouter = require("./routes/menuRoutes")
const orderRouter = require("./routes/orderRoutes")
const deliveryRouter = require("./routes/deliveryPersonnelRoutes")
const trackDeliveryRouter = require("./routes/trackDeliveryRoutes")
const certificateRouter = require("./routes/certificateRoute")

const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server started running on Port ${PORT}`)
})

app.get("/", (req,res)=>{
    return res.status(200).json({message:"Welcome to Restaurant server"})
})

app.use("/api", authRouter)
app.use("/api", restaurantRouter)
app.use("/api", menuRouter)
app.use("/api", orderRouter)
app.use("/api", deliveryRouter)
app.use("/api", trackDeliveryRouter)
app.use("/api", certificateRouter)