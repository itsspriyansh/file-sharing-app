const express = require("express")
const connectDB = require("./config/db")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require("path") 
const files = require("./api/routes/files")
const show = require("./api/routes/show")
const download = require("./api/routes/download")

const app = express()
const PORT = process.env.PORT || 3000
const viewPath = path.join(__dirname, "./views")

connectDB()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(express.static("public"))

app.set("views", viewPath)
app.set("view engine", "ejs")

app.use("/api/files", files)
app.use("/api/show", show)
app.use("/files/download", download)

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))

