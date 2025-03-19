const express = require('express')
const router = express.Router()

const {
    uploadHeroImageSchema,
    getHeroImage,
    createMenuImage,
    uploadMenuImageSchema,
    uploadFlyer1Schema,
    uploadFlyer2Schema,
    getFlyer1Schema,
    getFlyer2Schema,
    getAllMenuImage,
    getSingleMenuImage,
} = require('../controller/landingSectionController')

const {uploadHeroImage, uploadMenuImage, uploadFlyer1, uploadFlyer2} = require('../configuration/landingImageConfig')

router.patch('/updateHeroImageSchema', uploadHeroImage, uploadHeroImageSchema)
router.get('/getHeroImage', getHeroImage)

router.get('/getAllMenuImage', getAllMenuImage)
router.get('/getSingleMenuImage/:id', getSingleMenuImage)
router.post('/createMenuImage', uploadMenuImage, createMenuImage)
router.patch('/uploadMenuImageSchema/:id', uploadMenuImage, uploadMenuImageSchema)
router.patch('/uploadFlyer1Schema', uploadFlyer1, uploadFlyer1Schema)
router.get('/getFlyer1Schema', getFlyer1Schema)

router.patch('/uploadFlyer2Schema', uploadFlyer2, uploadFlyer2Schema)
router.get('/getFlyer2Schema', getFlyer2Schema)

module.exports = router