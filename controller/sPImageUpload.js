require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const generateCloudinaryUploadSignature = (req, res) => {

  const { folder, galleryType } = req.query;
  const upload_preset = (folder!=='gallery')? process.env.HAROLDS_SIGNED_CLOUDINARY_PRESET
          : (galleryType!=="video")? process.env.HAROLDS_SIGNED_CLOUDINARY_PRESET_GALLERY_IMAGE : process.env.HAROLDS_SIGNED_CLOUDINARY_PRESET_GALLERY_VIDEO;


  console.log(upload_preset);

  const timestamp = Math.round(new Date().getTime() / 1000);
  const info2Sign = {
      timestamp: timestamp,
      upload_preset,
    }  


    console.log(info2Sign)

  const signature = cloudinary.utils.api_sign_request(
    info2Sign,
    cloudinary.config().api_secret
  );


  res.json({
    timestamp,
    signature,
    cloudName: cloudinary.config().cloud_name,
    apiKey: cloudinary.config().api_key,
    upload_preset,
  });
};

module.exports = { generateCloudinaryUploadSignature };
