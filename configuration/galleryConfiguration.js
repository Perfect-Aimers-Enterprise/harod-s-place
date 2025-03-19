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
        folder: 'GalleryVideo',
        resource_type: 'video', // Specifies that it's a video upload
        format: async (req, res) => 'mp4',
        public_id: (req, file) => Date.now() + '-' + file.originalname

    }
})

// Multer instance for uploading a single file
const uploadGallery = multer({
    storage: storage
}).single('galleryMedia');

module.exports = { uploadGallery };
