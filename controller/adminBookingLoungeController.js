const LoungeBooking = require('../model/adminBookingLoungeModel')

const updateLoungeBookings = async (req, res) => {
    try {
        const { loungeType1, loungeType2, loungeType3, loungeTypePrice1, loungeTypePrice2, loungeTypePrice3, haroldsFeatures } = req.body
        const loungeBooking = await LoungeBooking.findOne()

        console.log('loungeBooking', loungeBooking);

        // if (!loungeBooking._id) {
        //     const loungeBookingCreate = await LoungeBooking.create({ loungeType1, loungeType2, loungeType3, loungeTypePrice1, loungeTypePrice2, loungeTypePrice3, perpetualFeatures })

        //     console.log('loungeBookingCreate', loungeBookingCreate);
            
        //     return res.status(201).json({loungeBookingCreate, message: 'Booking Data Created Successfully'})
        // } else {
        //     const loungeBookingVar = await LoungeBooking.findByIdAndUpdate(
        //         loungeBooking._id,
        //         { loungeType1, loungeType2, loungeType3, loungeTypePrice1, loungeTypePrice2, loungeTypePrice3, perpetualFeatures },
        //         { new: true, runValidators: true }

        //     )

        //     console.log('loungeBookingVar', loungeBookingVar);
            

        //     return res.status(200).json({loungeBookingVar, message: 'Booking Data Updated Successfully'})
        // }
        
        if(loungeBooking) {

            const loungeBookingVar = await LoungeBooking.findByIdAndUpdate(
                loungeBooking._id,
                { loungeType1, loungeType2, loungeType3, loungeTypePrice1, loungeTypePrice2, loungeTypePrice3, haroldsFeatures },
                { new: true, runValidators: true }

            )

            console.log('loungeBookingVar', loungeBookingVar);
            

            return res.status(200).json({loungeBookingVar, message: 'Booking Data Updated Successfully'})

        } else {
            console.log("Hello")
            const loungeBookingCreate = await LoungeBooking.create({ loungeType1, loungeType2, loungeType3, loungeTypePrice1, loungeTypePrice2, loungeTypePrice3, haroldsFeatures })
            console.log("after")
            console.log(loungeBookingCreate);

            console.log('loungeBookingCreate', loungeBookingCreate);
            
            return res.status(201).json({loungeBookingCreate, message: 'Booking Data Created Successfully'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
}

const getLounngeBookings = async (req, res) => {
    try {
        const getLounngeBookingsVar = await LoungeBooking.find()

        res.status(201).json(getLounngeBookingsVar)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { updateLoungeBookings, getLounngeBookings }