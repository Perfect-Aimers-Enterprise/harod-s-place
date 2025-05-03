require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const generateCloudinaryUploadSignature = (req, res) => {

  const { public_id } = req.query;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const upload_preset = process.env.HAROLDS_SIGNED_CLOUDINARY_PRESET;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      upload_preset,
      public_id
    },
    cloudinary.config().api_secret
  );


  res.json({
    timestamp,
    signature,
    cloudName: cloudinary.config().cloud_name,
    apiKey: cloudinary.config().api_key,
    upload_preset,
    public_id
  });
};

module.exports = { generateCloudinaryUploadSignature };
