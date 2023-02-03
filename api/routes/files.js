const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")

let storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, "uploads/"),
    fileName : (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

let upload = multer({
    storage : storage,
    limit : {fileSize : 1e8},
}).single("myfile")

router.post((req, res, next) => {

    if (!req.file) {
        return res.json({error : "all fields are required"})
    }

    upload(req, res, error => {
        if (error) {
            res.status(500).send({error : error.message})
        }
    })
})

module.exports = router

