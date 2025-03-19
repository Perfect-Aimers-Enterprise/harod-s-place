const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'deelam9kb',
    api_key: '537429937295938',
    api_secret: '4b6KwYuAzQjhQwYr_xAMMXJz1uo'
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dailyMenu',
        allowedFormats: ['jpg', 'png'],
        resource_type: 'image',
        public_id: (req, file) => Date.now() + '-' + file.originalname
    }
})


const dailyMenuStorage = multer({ storage: storage }).single('menuImage');

module.exports = { dailyMenuStorage };