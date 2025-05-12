const mongoose = require('mongoose')

const menuLandingSchema = new mongoose.Schema({
    menuLandingName: {type: String},
    menuLandingDes: {type: String},
    menuLandingImage: {type: String},
    media_public_id: {type: String}
})

module.exports = mongoose.model('MenuLanding', menuLandingSchema)