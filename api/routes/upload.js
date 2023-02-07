const express = require("express")
const router = express.Router()
require("dotenv").config()

router.get("/", (req, res) => {
    res.render("upload", {
        uploadLink : `${process.env.APP_BASE_URL}/upload`,
    })
})

const uploadPath = `${process.env.APP_BASE_URL}/api/files`

router.post("/upload", (req, res) => {

    const bodyFormData = new FormData(req.body.input)
    // bodyFormData.append()

    axios({
        method: "post",
        url: uploadPath,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
})

module.exports = router

