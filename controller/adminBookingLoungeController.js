const LoungeBooking = require('../model/adminBookingLoungeModel')

const updateLoungeBookings = async (req, res) => {
    try {
        const { loungeTypesAndPrices, haroldsFeatures } = req.body;
        const loungeBooking = await LoungeBooking.findOne()


      
        if(loungeBooking) {

            const loungeBookingVar = await LoungeBooking.findByIdAndUpdate(
                loungeBooking._id,
                { loungeTypesAndPrices, haroldsFeatures },
                { new: true, runValidators: true }

            )

            

            return res.status(200).json({loungeBookingVar, message: 'Booking Data Updated Successfully'})

        } else {
            const loungeBookingCreate = await LoungeBooking.create({ loungeTypesAndPrices, haroldsFeatures })

            
            return res.status(201).json({loungeBookingCreate, message: 'Booking Data Created Successfully'})
        }
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getLoungeBookings = async (req, res) => {
    try {
        const getLoungeBookingsVar = await LoungeBooking.find()
        let currentLoungeDetails = getLoungeBookingsVar[getLoungeBookingsVar.length - 1]
        res.status(200).json(currentLoungeDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { updateLoungeBookings, getLoungeBookings }