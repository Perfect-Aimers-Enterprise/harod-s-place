const express = require('express')
const router = express.Router()

const { executeLoungeBooking, getUserBookedLounge } = require('../controller/bookLoungeController')

router.post('/executeLoungeBooking', executeLoungeBooking)
router.get('/getUserBookedLounge', getUserBookedLounge)

module.exports = router