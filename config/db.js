require("dotenv").config()
const mongoose = require("mongoose")

function connectDB() {
    mongoose.connect("mongodb://localhost/file", () => console.log("connected to database"));
}

module.exports = connectDB
