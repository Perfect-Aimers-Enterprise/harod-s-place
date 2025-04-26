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
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Harolds/food_menu', // Folder name in Cloudinary
        format: async (req, file) => {
        return path.extname(file.originalname).replace('.', '');
}},
    public_id: (req, file) => {
        const nameWithoutExt = path.parse(file.originalname).name;
        return Date.now() + '-' + nameWithoutExt;
}

})


const memoryStorage = multer.memoryStorage();

// const menuStorage=(req, res, next)=>{
    
// try {
//     multer({ storage: storage }).single('menuImage')
//     next()  
// } catch (error) {
//     console.log("An error Ocurred")
//     console.log(error);
//     res.json({msg:'Upload Unsuccess full'}).status(500)
// }
// }


const menuStorage = multer({ storage: cloudStorage }).single('menuImage')
// const menuStorage = multer({ storage: memoryStorage }).single('menuImage')


module.exports = { menuStorage }

