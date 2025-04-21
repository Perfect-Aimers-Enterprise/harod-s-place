const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const HeroImage = require('../model/landingPageModel');
const MenuLanding = require('../model/menuLandingSchema')
const Flyer1 = require('../model/flyer1Model')
const Flyer2 = require('../model/flyer2Model')


const uploadHeroImageSchema = async (req, res) => {
    try {
        const { heroImageName, heroImageDes } = req.body;
        const heroImageUrlFile = req.file.path;

        const existingHeroImage = await HeroImage.findOne();
        if (existingHeroImage) {
            // Delete old image from Cloudinary
            const oldImagePublicId = existingHeroImage.heroImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`landingpages/${oldImagePublicId}`);

            const updatedHeroImage = await HeroImage.findByIdAndUpdate(
                existingHeroImage._id,
                { heroImageName, heroImageDes, heroImage: heroImageUrlFile },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ updatedHeroImage, message: 'Hero image updated successfully!' });
        } else {
            const newHeroImage = await HeroImage.create({
                heroImageName,
                heroImageDes,
                heroImage: heroImageUrlFile
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
        const { menuLandingName, menuLandingDes } = req.body;
        const menuLandingImageUrl = req.file.path;

        const existingMenuImages = await MenuLanding.find();
        if (existingMenuImages.length >= 4) {
            return res.status(400).json({ message: 'Maximum of 4 menu images allowed!' });
        }

        const newMenuImage = await MenuLanding.create({
            menuLandingName,
            menuLandingDes,
            menuLandingImage: menuLandingImageUrl
        });
        res.status(201).json({ newMenuImage, message: 'Menu image uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const uploadMenuImageSchema = async (req, res) => {
    try {

        const { id: menuImageId } = req.params
        const { menuLandingName, menuLandingDes } = req.body
        menuLandingImageUrl = req.file.path

        const menuImageSchema = await MenuLanding.findOneAndUpdate(
            { _id: menuImageId },
            { menuLandingName, menuLandingDes, menuLandingImage: menuLandingImageUrl },
            { new: true, runValidators: true }
        )

        res.status(201).json({ menuImageSchema, message: 'menuLandingPage Uploaded Successfullyl' })
    } catch (error) {
        res.status(500).json({msg:"Internal Server Error"})
    }
}

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
        const { flyer1Title } = req.body;
        const flyer1ImageUrl = req.file.path;

        const existingFlyer1 = await Flyer1.findOne();
        if (existingFlyer1) {

            // Delete old image from Cloudinary
            const oldImagePublicId = existingFlyer1.flyer1Image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`landingpages/${oldImagePublicId}`);

            const updatedFlyer1 = await Flyer1.findByIdAndUpdate(
                existingFlyer1._id,
                { flyer1Title, flyer1Image: flyer1ImageUrl },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ updatedFlyer1, message: 'Flyer1 updated successfully!' });
        } else {
            const newFlyer1 = await Flyer1.create({
                flyer1Title,
                flyer1Image: flyer1ImageUrl
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
        const { flyer2Title } = req.body;
        const flyer2ImageUrl = req.file.path;

        console.log('uploadFlyerSchema');

        const existingFlyer2 = await Flyer2.findOne();
        console.log('Existing Flyer2 Test Schema', existingFlyer2);

        if (existingFlyer2) {
            // Delete old image from Cloudinary
            const oldImagePublicId = existingFlyer2.flyer2Image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`landingpages/${oldImagePublicId}`);
            const updatedFlyer2 = await Flyer2.findByIdAndUpdate(
                existingFlyer2._id,
                { flyer2Title, flyer2Image: flyer2ImageUrl },
                { new: true, runValidators: true }
            );

            console.log('New Flyer2 Test Schema', updatedFlyer2);

            return res.status(200).json({ updatedFlyer2, message: 'Flyer2 updated successfully!' });
        } else {
            const newFlyer2 = await Flyer2.create({
                flyer2Title,
                flyer2Image: flyer2ImageUrl
            });
            return res.status(201).json({ newFlyer2, message: 'Flyer2 created successfully!' });
        }
    } catch (error) {
        res.status(500).json({ error });
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

module.exports = {
    uploadHeroImageSchema,
    getHeroImage,
    createMenuImage,
    uploadMenuImageSchema,
    getAllMenuImage,
    getSingleMenuImage,
    uploadFlyer1Schema,
    uploadFlyer2Schema,
    getFlyer1Schema,
    getFlyer2Schema
};
