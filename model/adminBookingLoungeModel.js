const mongoose = require('mongoose')

// const adminBookLoungeSchema = new mongoose.Schema({
//     loungeType1: { type: String, required: true },
//     loungeType2: { type: String, required: true },
//     loungeType3: { type: String, required: true },
//     loungeTypePrice1: {type: Number, required: true},
//     loungeTypePrice2: {type: Number, required: true},
//     loungeTypePrice3: {type: Number, required: true},
//     haroldsFeatures: {type: String}
// })


const loungeTypesAndPriceSchema = new mongoose.Schema({
    loungeType: { type: String, required: true },
    loungeTypePrice: {type: Number, required: true},

})

const adminBookLoungeSchema = new mongoose.Schema({
    // loungeType: { type: String, required: true },
    // loungeTypePrice: {type: Number, required: true},
    loungeTypesAndPrice: [{loungeTypesAndPriceSchema}],
    haroldsFeatures: {type: String}
})

module.exports = mongoose.model('LoungeBooking', adminBookLoungeSchema)