const mongoose = require("mongoose")

const textSchema = mongoose.Schema({
    data : {type : String},
})

module.exports = mongoose.model("Text", textSchema)
