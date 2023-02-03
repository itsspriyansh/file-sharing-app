require("dotenv").config()
const mongoose = require("mongoose")

const URL = `mongodb+srv://itsspriyansh:${process.env.MONOGO_CONNECTION_PASSWORD}@cluster0.wjdlm03.mongodb.net/?retryWrites=true&w=majority`

function connectDb () {
    mongoose.connect(URL, { 
        useNewUrlParser : true, 
        useCreateIndex : true, 
        useUnifiedTopology : true, 
        useFindAndModify : true,
    })
    const connection = mongoose.connection
    connection.once("open", () => {
        console.log ("connection established")
    })
}

module.exports = connectDb
