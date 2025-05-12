const mongoose = require('mongoose');

const dailyMenuSchema = new mongoose.Schema({
    menuTitle: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    menuImage: {
        type: String,
        required: true
    },
    media_public_id: {type: String}
}, { timestamps: true });


module.exports = mongoose.model('DailyMenu', dailyMenuSchema);
