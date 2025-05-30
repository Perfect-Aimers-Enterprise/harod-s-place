const gallery = require('../model/gallery')
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const createGallery = async (req, res) => {
    try {

        console.log("Creating the gallery...")

        const { galleryTitle, galleryType, mediaURL, public_id:media_public_id  } = req.body

        const galleryUrl = mediaURL;

        console.log(req.body)
        console.log(galleryUrl);

        if (!galleryTitle || !galleryType || !galleryUrl) {
            return res.status(400).json({ error: "Incomplete credentials" });
        }

        const createGalleryVar = await gallery.create({galleryTitle, galleryType, galleryMedia: galleryUrl, media_public_id})


        res.status(201).json({createGalleryVar})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)   
    }
}

const getGallery = async (req, res) => {
    try {
        const galleryVar = await gallery.find()

        res.status(200).json(galleryVar)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteGallery = async (req, res) => {
    try {

        const {id: deleteGalleryId} = req.params
        const galleryVar = await gallery.findOne({_id: deleteGalleryId})

        const mediaPublicId = galleryVar.media_public_id;

        console.log(galleryVar.galleryMedia)
        console.log(mediaPublicId)
        
        await cloudinary.uploader.destroy(mediaPublicId, {
            invalidate: true,
            resource_type: galleryVar.galleryType,
        }
    );
        await gallery.findByIdAndDelete(deleteGalleryId)

        res.status(200).json({msg:'Gallery Image Deleted Successfully'})
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

module.exports = {
    createGallery,
    getGallery,
    deleteGallery
}