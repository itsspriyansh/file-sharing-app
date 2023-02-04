const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const File = require("../models/file")
const { v4 : uuid } = require("uuid") 

// const uploadPath = path.join(__dirname, "../../uploads/")

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
    limits : {fileSize : 100000000},
}).single("myfile")


router.post("/" ,(req, res) => {
    
    upload(req, res, async (error) => {
    
        await console.log(req.file)
        
        if (!req.file) {
            return res.json({error : "all fields are required", content: ""+req.file})
        }
    
        if (error) {
            res.status(500).send({error : error.message})
        }
        // const file = new File({
        //     filename : req.file.filename,
        //     uuid : uuid(),
        //     path : req.file.path,
        //     size : req.file.size,   
        // })
        // res.send(req.file.size)
    
    const file = await File.create({
            filename : req.file.filename,
            uuid : uuid(),
            path : req.file.path,
            size : req.file.size,
        })
        // res.send("hello")
        return res.json({file : `${process.env.APP_BASE_URL}/file/${response.uuid}`})
        const response = await file.save()
    })


    // upload(req, res, async (err) => {
    //     if (err) {
    //       return res.status(500).send({ error: err.message });
    //     }
    //       const file = new File({
    //           filename: req.file.filename,
    //           uuid: uuidv4(),
    //           path: req.file.path,
    //           size: req.file.size
    //       });
    //       const response = await file.save();
    //       res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    //     });
})

module.exports = router

