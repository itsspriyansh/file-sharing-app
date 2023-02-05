const express = require("express")
const connectDB = require("./config/db")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const files = require("./api/routes/files")
const show = require("./api/routes/show")

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use("/api/files", files)
app.use("/api/show", show)

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))

