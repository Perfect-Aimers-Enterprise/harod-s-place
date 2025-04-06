const mongoose = require('mongoose')


const loungeTypesAndPriceSchema = new mongoose.Schema({
    loungeType: { type: String, required: true },
    loungeTypePrice: {type: String, required: true},

})

const adminBookLoungeSchema = new mongoose.Schema({
    loungeTypesAndPrices: [loungeTypesAndPriceSchema],
    haroldsFeatures: {type: String}
})

module.exports = mongoose.model('LoungeBooking', adminBookLoungeSchema)