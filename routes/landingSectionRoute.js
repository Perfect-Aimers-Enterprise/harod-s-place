const express = require('express')
const router = express.Router()

const {
    uploadHeroImageSchema,
    getHeroImage,
    createMenuImage,
    // uploadMenuImageSchema,
    uploadFlyer1Schema,
    uploadFlyer2Schema,
    getFlyer1Schema,
    getFlyer2Schema,
    getAllMenuImage,
    getSingleMenuImage,
    deleteFlyer1Schema,
    deleteFlyer2Schema
} = require('../controller/landingSectionController');

const { generateCloudinaryUploadSignature } = require('../controller/sPImageUpload');

const {uploadHeroImage, uploadMenuImage, uploadFlyer1, uploadFlyer2} = require('../configuration/landingImageConfig')

router.get('/getUploadSignature', generateCloudinaryUploadSignature)
router.put('/updateHeroImageSchema', uploadHeroImageSchema)
router.get('/getHeroImage', getHeroImage)

router.get('/getAllMenuImage', getAllMenuImage)
router.get('/getSingleMenuImage/:id', getSingleMenuImage)
router.post('/createMenuImage', uploadMenuImage, createMenuImage)
// router.put('/uploadMenuImageSchema/:id', uploadMenuImage, uploadMenuImageSchema)
router.put('/uploadFlyer1Schema', uploadFlyer1, uploadFlyer1Schema)
router.get('/getFlyer1Schema', getFlyer1Schema)

router.put('/uploadFlyer2Schema', uploadFlyer2, uploadFlyer2Schema)
router.get('/getFlyer2Schema', getFlyer2Schema)

router.delete('/deleteFlyer1Schema/:id', deleteFlyer1Schema)
router.delete('/deleteFlyer2Schema/:id', deleteFlyer2Schema)


router.get('/getUploadSignature', generateCloudinaryUploadSignature);

module.exports = router