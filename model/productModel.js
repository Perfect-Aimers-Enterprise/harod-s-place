const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    menuProductName: {type: String},
    menuDescription: {type: String},
    menuPrice: {type: Number},
    menuImage: {type: String},
    media_public_id: {type: String},
    variations: [
        {
            size: { type: String}, // Size (e.g., 1L, 2L)
            price: { type: Number} // Price for the size
        }
    ]
}, { timestamps: true } )

module.exports = mongoose.model('productSchema', productSchema)