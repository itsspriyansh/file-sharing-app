require("dotenv").config()
const mongoose = require("mongoose")

const URL = `mongodb+srv://itsspriyansh:${process.env.MONOGO_CONNECTION_PASSWORD}@cluster0.wjdlm03.mongodb.net/?retryWrites=true&w=majority`

function connectDB() {
    mongoose.connect(URL, () => console.log("connected to database"));
}

module.exports = connectDB
