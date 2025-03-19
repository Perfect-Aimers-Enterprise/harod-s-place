const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getRegisteredUser, verifyRegisteredUser, forgottenPassword, resetPassword} = require('../controller/userController')

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/getRegisteredUser', getRegisteredUser)
router.get('/verify-email', verifyRegisteredUser)
router.post('/4gotten-password', forgottenPassword)
router.post('/reset-password', resetPassword)

module.exports = router