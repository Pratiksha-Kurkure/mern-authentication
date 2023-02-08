const mongoose = require("mongoose")

exports.connect = () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}