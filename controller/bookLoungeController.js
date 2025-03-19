const LoungeBookingUser = require('../model/bookLoungeModel')

const executeLoungeBooking = async (req, res) => {
    // const {
    //     userBookingMail,
    //     userBookingTel,
    //     userBookingName,
    //     numberOfGuest,
    //     loungeType,
    //     eventType,
    //     eventName,
    //     bookingContact,
    //     eventMessage,
    //     eventTime,
    //     eventDate
    // } = req.body
    try {
        const executeBooking = await LoungeBookingUser.create({
            ...req.body
        })
        res.status(201).json({executeBooking, message: 'Booked Successfully'})
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUserBookedLounge = async (req, res) => {
    try {
        const getLoungeBookings = await LoungeBookingUser.find()

        res.status(201).json({getLoungeBookings})
    } catch (error) {
        res.status(500).json(error)   
    }
}

module.exports = { executeLoungeBooking, getUserBookedLounge }