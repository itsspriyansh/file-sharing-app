const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const File = require("../models/file")
const { v4 : uuid } = require("uuid")
const sendMail = require("../../services/emailService")
const emailTemplate = require("../../services/emailTemplate")
require("dotenv").config()


const uploadPath = path.join(__dirname, "../../uploads/")

let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        return cb(null, "uploads/")
    },
    filename : (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

let upload = multer({
    storage : storage,
    limits : {fileSize : 100 * 1E6},
})


router.post("/", upload.single("myfile"), async (req, res) => {
    if (!req.file) {
        return res.json({error : "all fields are required"})
    }

    if (req.file.size > 5 * 1E6) {
        res.send("file too large!")
    }

    const file = await File.create({
        filename : req.file.filename,
        uuid : uuid(),
        path : req.file.path,
        size : req.file.size,
    })

    res.redirect(`/send/${file.uuid}`)
})


router.post("/send", async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body
    if (!uuid || !emailTo || !emailFrom) {
        res.status(422).json({error : "all fields are required"})                
    }

    const file = await File.findOne({uuid : uuid})
    if (file.sender) {
        res.status(422).json({error : "email already sent"})
    }
    
    file.sender = emailFrom
    file.receiver = emailTo
    const response = await file.save()

    sendMail({
        from : emailFrom,
        to : emailTo,
        subject : `inShare file sharing`,
        text : `${emailFrom} sent you a file`,
        html : emailTemplate({
            emailFrom : emailFrom,
            downloadLink : `${process.env.APP_BASE_URL}/api/show/${file.uuid}`,
            size : file.size,
            expires : "24hrs",
        }),
    })

    res.send("email sent successfully!")
})

module.exports = router
