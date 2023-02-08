const express = require("express")
const router = express.Router()
require("dotenv").config()

router.get("/:uuid", async (req, res) => {
    const uuid = req.params.uuid
    const downloadLink = `${process.env.APP_BASE_URL}/api/show/${uuid}`

    res.render("send", {uuid, downloadLink})
})

module.exports = router
