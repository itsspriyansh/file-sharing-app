// require("dotenv").config()
// const mongoose = require("mongoose")

// const URL = "mongodb://localhost/file"

// function connectDb () {
//     mongoose.connect(URL, { 
//         useNewUrlParser : true, 
//         useCreateIndex : true, 
//         useUnifiedTopology : true, 
//         useFindAndModify : true,
//     })
//     const connection = mongoose.connection
//     connection.once("open", () => {
//         console.log ("connection established")
//     })
// }

require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    // Database connection 🥳
    mongoose.connect("mongodb://localhost/file", () => console.log("connected to database"));
}

module.exports = connectDB

