const express = require("express")
const connectDb = require("./config/db")
const files = require("./api/routes/files")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT || 3000

connectDb()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use("/api/files", files)

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))

