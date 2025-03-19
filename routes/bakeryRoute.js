const express = require('express')

const router = express.Router()
const { requestBakery, getAllBakery } = require('../controller/bakeryContainer')

router.post('/requestBakery', requestBakery)
router.get('/getAllBakery', getAllBakery)

module.exports = router