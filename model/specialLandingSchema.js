const mongoose = require('mongoose')

const specialLandingSchema = new mongoose.Schema({
    specialLandingName: {type: String},
    specialLandingDes: {type: String},
    specialLandingImage: {type: String},
    media_public_id: {type: String}
})

module.exports = mongoose.model('SpecialLanding', specialLandingSchema)