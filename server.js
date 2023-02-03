const express = require("express")
const connectDb = require("./config/db")

const app = express()
const PORT = process.env.PORT || 3000

connectDb()

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))

