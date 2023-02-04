const express = require("express")
const connectDb = require("./config/db")
const files = require("./api/routes/files")

const app = express()
const PORT = process.env.PORT || 3000

connectDb()

app.use("/api/files", files)
app.use(express.json())

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))
