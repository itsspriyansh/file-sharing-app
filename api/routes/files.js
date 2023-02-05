const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const File = require("../models/file")
const { v4 : uuid } = require("uuid")


const uploadPath = path.join(__dirname, "../../uploads/")

let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        return cb(null, uploadPath)
    },
    filename : (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

let upload = multer({
    storage : storage,
    limits : {fileSize : 100 * 1E6},
}).single("myfile")

router.post ("/text", async (req, res) => {
    const { data } = req.body
    const text = await Text.create({
        data : data
    })
    res.send(text)
})


router.post("/" , (req, res) => {

    upload(req, res, async (error) => {
        if (!req.file) {
            return res.json({error : "all fields are required"})
        }
        if (error) {
            res.status(500).send({error : error.message})
        }
        const file = await File.create({
            filename : req.file.filename,
            uuid : uuid(),
            path : req.file.path,
            size : req.file.size,
        })
        res.json(file)
        res.json({file : `${process.env.APP_BASE_URL}/file/${file.uuid}`})
    })
})

router.post("/send", async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body
    if (!uuid || !emailTo || !emailFrom) {
        res.status(422).json({error : "all fields are required"})                
    }

    const file = File.findOne({uuid : uuid})
    if (!file.sender) {
        res.status(422).json({error : "email already sent"})
    }

    file.sender = emailFrom
    file.receiver = emailTo
    const response = await file.save()

    //file save
})

module.exports = router

