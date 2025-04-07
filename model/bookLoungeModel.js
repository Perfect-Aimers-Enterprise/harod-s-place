const mongoose = require('mongoose')

const bookLoungeSchema = new mongoose.Schema({
    userBookingName: {type: String, required: true},
    userBookingTel: {type: Number, required: true},
    userBookingEmail: {type: String, required: true},
    bookingContact: {type: Number, required: true},
    numberOfGuests: {type: String, required: true},
    loungeType: {type: String, required: true},
    eventName: {type: String, required: true},
    eventType: {type: String, required: true},
    eventMessage: {type: String},
    eventTime: {type: String},
    eventDate: {type: String},
    
})

module.exports = mongoose.model('LoungeBookingUser', bookLoungeSchema)