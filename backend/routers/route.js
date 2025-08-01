const express = require('express')

const { getMethod,postMethod } = require('../controllers/transcribe_control')

const router = express.Router()

router.get( '/' , getMethod )

router.post( '/' , postMethod )

module.exports = router