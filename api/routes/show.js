const express = require("express")
const router = express.Router()
const File = require("../models/file")
require("dotenv").config()

router.get("/all", async (req, res) => {
    try {
        const files = await File.find()
        res.json(files)
    } catch (error) {
        res.json(error)
    }
})

router.get("/:uuid", async (req, res) => {
    const uuid = req.params.uuid
    try {
        const file = await File.findOne({uuid : uuid})
        if (!file) {
            res.render("download", {error : "link doesn't exist!"})
        }
        res.render("download", {
            uuid : file.uuid,
            fileName : file.filename,
            fileSize : file.size,
            downloadLink : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router

