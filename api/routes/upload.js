const express = require("express")
const router = express.Router()
require("dotenv").config()

router.get("/", (req, res) => {
    res.render("upload", {
        uploadLink : `${process.env.APP_BASE_URL}/upload`,
    })
})

module.exports = router

