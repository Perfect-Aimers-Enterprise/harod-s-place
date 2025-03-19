const express = require('express')
const router = express.Router()

const { updateLoungeBookings, getLounngeBookings } = require('../controller/adminBookingLoungeController')

router.patch('/updateLoungeBookings', updateLoungeBookings)
router.get('/getLounngeBookings', getLounngeBookings)

module.exports = router