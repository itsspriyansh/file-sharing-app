const express = require("express")
const router = express.Router()
const File = require("../models/file")

router.get("/:uuid", async (req, res) => {

    const file = await File.findOne({uuid : req.params.uuid})
    if (!file) {
        res.status(500).json({error : "file doesn't exist!"})
    }

    res.download(file.path)
})

module.exports = router
