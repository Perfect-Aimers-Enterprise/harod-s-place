const gallery = require('../model/gallery')
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const createGallery = async (req, res) => {
    try {

        const { galleryTitle, galleryType  } = req.body

        const galleryUrl = req.file.path

        if (!galleryTitle || !galleryType || !galleryUrl) {
            return res.status(400).json({ error: "Incomplete credentials" });
        }

        const createGalleryVar = await gallery.create({galleryTitle, galleryType, galleryMedia: galleryUrl})


        res.status(201).json({createGalleryVar})
    } catch (error) {
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
        const galleryVar = await gallery.findOneAndDelete({_id: deleteGalleryId})

        const oldImagePublicId = galleryVar.galleryMedia.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`GalleryVideo/${oldImagePublicId}`);

        res.status(200).json(galleryVar)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createGallery,
    getGallery,
    deleteGallery
}