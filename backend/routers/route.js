const express = require('express')

const upload = require('../multer/audio_handler')

const { getMethod,postMethod } = require('../controllers/transcribe_control')

const router = express.Router()

router.get( '/' , getMethod )

router.post( '/', upload.single('audio') , postMethod )

module.exports = router