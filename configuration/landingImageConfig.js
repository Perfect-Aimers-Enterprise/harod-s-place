const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Setup Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Harolds/landingpages', // Folder name in Cloudinary
        format: async (req, file) => {
        return path.extname(file.originalname).replace('.', '');
}},
    public_id: (req, file) => {
        const nameWithoutExt = path.parse(file.originalname).name;
        return Date.now() + '-' + nameWithoutExt;
}

})

const uploadHeroImage = multer({ storage: storage }).single('heroImage')
const uploadMenuImage = multer({ storage: storage }).single('menuLandingImage')
const uploadFlyer1 = multer({ storage: storage }).single('flyer1Image')
const uploadFlyer2 = multer({ storage: storage }).single('flyer2Image')

module.exports = { uploadHeroImage, uploadMenuImage,  uploadFlyer1, uploadFlyer2 }