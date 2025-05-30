const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Import Models
const HeroImage = require('../model/landingPageModel');
const MenuLanding = require('../model/menuLandingSchema')
const Flyer1 = require('../model/flyer1Model')
const Flyer2 = require('../model/flyer2Model')


// const uploadHeroImageSchema = async (req, res) => {
//     try {
//         const { heroImageName, heroImageDes } = req.body;

//         console.log('req.file', req.file);

//         const heroImageUrlFile = req.file.path;

//         const existingHeroImage = await HeroImage.findOne();
//         if (existingHeroImage) {
//             // Delete old image from Cloudinary
//             const oldImagePublicId = existingHeroImage.heroImage.split('/').pop().split('.')[0];
//             await cloudinary.uploader.destroy(`landingpages/${oldImagePublicId}`);

//             const updatedHeroImage = await HeroImage.findByIdAndUpdate(
//                 existingHeroImage._id,
//                 { heroImageName, heroImageDes, heroImage: heroImageUrlFile },
//                 { new: true, runValidators: true }
//             );
//             return res.status(200).json({ updatedHeroImage, message: 'Hero image updated successfully!' });
//         } else {
//             const newHeroImage = await HeroImage.create({
//                 heroImageName,
//                 heroImageDes,
//                 heroImage: heroImageUrlFile
//             });
//             return res.status(201).json({ newHeroImage, message: 'Hero image created successfully!' });
//         }

//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };

const uploadHeroImageSchema = async (req, res) => {
    try {
        const { heroImageName, heroImageDes, mediaURL, public_id } = req.body;

        const existingHeroImage = await HeroImage.findOne();
        if (existingHeroImage) {
            // Delete old image from Cloudinary
            const oldImagePublicId = existingHeroImage.media_public_id;
            await cloudinary.uploader.destroy(`${oldImagePublicId}`, {
                invalidate: true
            });
            const updatedHeroImage = await HeroImage.findByIdAndUpdate(
                existingHeroImage._id,
                { heroImageName,  heroImage: mediaURL, media_public_id: public_id, heroImageDes },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ updatedHeroImage, message: 'Hero image updated successfully!' });
        } else {
            const newHeroImage = await HeroImage.create({
                heroImageName,
                heroImageDes,
                heroImage: mediaURL,
                media_public_id: public_id
            });
            return res.status(201).json({ newHeroImage, message: 'Hero image created successfully!' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
};

const getHeroImage = async (req, res) => {
    try {
        const getHeroImageVar = await HeroImage.find()

        res.status(201).json(getHeroImageVar)
    } catch (error) {
        res.status(500).json(error, message = "Couldn't get HeroImage to display")
    }
}

// Menu Image Controller
const createMenuImage = async (req, res) => {
    try {
        const { menuLandingName, menuLandingDes, mediaURL, public_id } = req.body;
        const menuLandingImageUrl = mediaURL;

        const existingMenuImages = await MenuLanding.find();
        // if (existingMenuImages.length >= 4) {
        //     return res.status(400).json({ message: 'Maximum of 4 menu images allowed!' });
        // }

        const newMenuImage = await MenuLanding.create({
            menuLandingName,
            menuLandingDes,
            menuLandingImage: menuLandingImageUrl,
            media_public_id: public_id
        });
        res.status(201).json({ newMenuImage, message: 'Menu image uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// const uploadMenuImageSchema = async (req, res) => {
//     try {

//         const { id: menuImageId } = req.params
//         const { menuLandingName, menuLandingDes, mediaURL } = req.body
//         menuLandingImageUrl = mediaURL

//         const menuImageSchema = await MenuLanding.findOneAndUpdate(
//             { _id: menuImageId },
//             { menuLandingName, menuLandingDes, menuLandingImage: menuLandingImageUrl },
//             { new: true, runValidators: true }
//         )

//         res.status(201).json({ menuImageSchema, message: 'menuLandingPage Uploaded Successfullyl' })
//     } catch (error) {
//         res.status(500).json({msg:"Internal Server Error"})
//     }
// }

const getAllMenuImage = async (req, res) => {
    try {
        const getAllMenuImageVar = await MenuLanding.find()

        res.status(201).json(getAllMenuImageVar)
    } catch (error) {
        res.status(500).json({msg:"Internal Server Error"})
    }
}

const getSingleMenuImage = async (req, res) => {
    try {

        const { id: singleMenuId } = req.params
        const getSingleMenuImageVar = await MenuLanding.findOne({ _id: singleMenuId })
        res.status(201).json(getSingleMenuImageVar)

    } catch (error) {
        console.log(error);
    }
}

// Flyer 1 Image Controller (Only 1 flyer)
const uploadFlyer1Schema = async (req, res) => {
    try {
        const { flyer1Title, mediaURL, public_id } = req.body;
        const flyer1ImageUrl = mediaURL;

        const existingFlyer1 = await Flyer1.findOne();
        if (existingFlyer1) {

            // Delete old image from Cloudinary
            const oldImagePublicId = existingFlyer1.media_public_id
            await cloudinary.uploader.destroy(oldImagePublicId, {
                invalidate: true
            });

            const updatedFlyer1 = await Flyer1.findByIdAndUpdate(
                existingFlyer1._id,
                { flyer1Title, flyer1Image: flyer1ImageUrl, media_public_id:public_id },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ updatedFlyer1, message: 'Flyer1 updated successfully!' });
        } else {
            const newFlyer1 = await Flyer1.create({
                flyer1Title,
                flyer1Image: flyer1ImageUrl,
                media_public_id: public_id
            });
            return res.status(201).json({ newFlyer1, message: 'Flyer1 created successfully!' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Unable to Upload Flyer' });
    }
};

const getFlyer1Schema = async (req, res) => {
    try {
        const getFlyer1Var = await Flyer1.find()
        res.status(201).json(getFlyer1Var)
    } catch (error) {
        res.status(500).json({ message: 'Unable to Load Flyer1' })
    }
}

// Flyer 2 Image Controller (Only 1 flyer)
const uploadFlyer2Schema = async (req, res) => {
    try {
        const { flyer2Title, mediaURL, public_id } = req.body;
        const flyer2ImageUrl = mediaURL;

        console.log('uploadFlyerSchema');
        console.log(req.body);

        const existingFlyer2 = await Flyer2.findOne();
        if (existingFlyer2) {
            // Delete old image from Cloudinary
            const oldImagePublicId = existingFlyer2.media_public_id;
            await cloudinary.uploader.destroy(oldImagePublicId, {
                invalidate: true
            });
            const updatedFlyer2 = await Flyer2.findByIdAndUpdate(
                existingFlyer2._id,
                { flyer2Title, flyer2Image: flyer2ImageUrl, media_public_id:public_id },
                { new: true, runValidators: true }
            );

            console.log('New Flyer2 Test Schema', updatedFlyer2);

            return res.status(200).json({ updatedFlyer2, message: 'Flyer2 updated successfully!' });
        } else {
            const newFlyer2 = await Flyer2.create({
                flyer2Title,
                flyer2Image: flyer2ImageUrl,
                media_public_id: public_id
            });
            return res.status(201).json({ newFlyer2, message: 'Flyer2 created successfully!' });
        }
    } catch (error) {
        res.status(500).json({ error });
        console.log(error)
    }
};


const getFlyer2Schema = async (req, res) => {
    try {
        const getFlyer2Var = await Flyer2.find()
        res.status(201).json(getFlyer2Var)
    } catch (error) {
        res.status(500).json({ error, message: 'Flyer2 not found' })
    }
}

const deleteFlyer1Schema = async (req, res) => {
    try {
        const flyerId = req.params.id;
        const getFlyer1Var = await Flyer1.findById(flyerId);
        console.log(getFlyer1Var);
        const flyer_image_public_id = getFlyer1Var.media_public_id;
        await cloudinary.uploader.destroy(flyer_image_public_id, {
            invalidate: true
        }); 
        await getFlyer1Var.deleteOne();       
        res.status(201).json({msg:"Flyer 1 delete successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, message: 'Unable to delete flyer 1' })
    }
}

const deleteFlyer2Schema = async (req, res) => {
    try {
        const flyerId = req.params.id;
        const getFlyer2Var = await Flyer2.findById(flyerId);
        console.log(getFlyer2Schema)
        const flyer_image_public_id = getFlyer2Var.media_public_id;
        await cloudinary.uploader.destroy(flyer_image_public_id, {
            invalidate: true
        });   
        await getFlyer2Var.deleteOne()   
        res.status(201).json({msg:"Flyer 2 delete successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: 'Unable to delete flyer 2' })
    }
}

const deleteHeroImage = async (req, res) => {
    try {
        const HeroImageId = req.params.id;
        const HeroImageVar = await HeroImage.findById(HeroImageId);
        const hero_image_public_id = HeroImageVar.media_public_id;
        await cloudinary.uploader.destroy(hero_image_public_id, {
            invalidate: true
        }); 
        await HeroImageVar.deleteOne();
        res.status(201).json({msg:"Hero Image delete successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, msg: 'Unable to delete hero Image' })
    }
}

module.exports = {
    uploadHeroImageSchema,
    getHeroImage,
    createMenuImage,
    getAllMenuImage,
    getSingleMenuImage,
    uploadFlyer1Schema,
    uploadFlyer2Schema,
    getFlyer1Schema,
    getFlyer2Schema,
    deleteFlyer1Schema,
    deleteFlyer2Schema,
    deleteHeroImage
};
