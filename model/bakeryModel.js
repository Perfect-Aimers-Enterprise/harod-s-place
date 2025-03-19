const mongoose = require('mongoose')

const bakerySchema = new mongoose.Schema({
    bakeType: { type: String, required: true },
    otherBakeType: {type: String},
    bakeQuantity: {type: Number},
    bakeDescription: {type: String},
    bakeContact: {type: Number},
    userOrderName: {type: String},
    userOrderContact: {type: Number},
    userOrderEmail: {type: String}
}, {timestamps: true})


module.exports = mongoose.model('Bakery', bakerySchema)