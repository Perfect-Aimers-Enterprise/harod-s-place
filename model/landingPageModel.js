const mongoose = require('mongoose')

const heroImageSchema = new mongoose.Schema({
    heroImageName: {type: String},
    heroImageDes: {type: String},
    heroImage: {type: String},
    media_public_id: {type: String}
})









// Export models
module.exports = mongoose.model('HeroImage', heroImageSchema)