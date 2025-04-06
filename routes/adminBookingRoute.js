const express = require('express')
const router = express.Router()

const { updateLoungeBookings, getLoungeBookings } = require('../controller/adminBookingLoungeController')

router.patch('/updateLoungeBookings', updateLoungeBookings)
router.get('/getLoungeBookings', getLoungeBookings)

module.exports = router