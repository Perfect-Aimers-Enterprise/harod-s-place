const DailyMenu = require('../model/dailyMenuModel');
const cloudinary = require('cloudinary').v2;

const createDailyMenu = async (req, res) => {
    try {
        const { menuTitle, price, mediaURL:menuImage, public_id:media_public_id } = req.body;

        if (!menuTitle || !price || !menuImage) {
            return res.status(400).json({ error: "Incomplete credentials" });
        }

        const createMenuVar = await DailyMenu.create({ menuTitle, price, menuImage, media_public_id });
        res.status(201).json({ createMenuVar });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllDailyMenus = async (req, res) => {
    try {
        const menuVar = await DailyMenu.find();
        res.status(200).json(menuVar);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getSingleDailyMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menuVar = await DailyMenu.findById(id);

        if (!menuVar) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json(menuVar);
    } catch (error) {
        res.status(500).json(error);
    }
};

// const updateDailyMenu = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { menuTitle, price } = req.body;
//         let updatedFields = { menuTitle, price };

//         if (req.file) {
//             const newImage = req.file.path;
//             updatedFields.menuImage = newImage;

//             const existingMenu = await DailyMenu.findById(id);
//             if (existingMenu) {
//                 const oldImagePublicId = existingMenu.menuImage.split('/').pop().split('.')[0];
//             await cloudinary.uploader.destroy(`dailyMenu/${oldImagePublicId}`);
//             }
//         }

//         const updatedMenu = await DailyMenu.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });
//         res.status(200).json(updatedMenu);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

const updateDailyMenu = async (req, res) => {  // <-- Check for allowance of req.file
    try {
        const { id } = req.params;
        const { menuTitle, price } = req.body;
        let updatedFields = { menuTitle, price };

        // if (req.file) {
        //     const newImage = req.file.path;
        //     updatedFields.menuImage = newImage;

        //     const existingMenu = await DailyMenu.findById(id);
        //     if (existingMenu) {
        //         const oldImagePublicId = existingMenu.menuImage.split('/').pop().split('.')[0];
        //     await cloudinary.uploader.destroy(`dailyMenu/${oldImagePublicId}`);
        //     }
        // }

        const updatedMenu = await DailyMenu.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteDailyMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menuVar = await DailyMenu.findById(id);
        
        if (!menuVar) {
            return res.status(404).json({ error: "Menu product not found" });
        }

        const imagePublicId = menuVar.media_public_id;
        console.log(imagePublicId)
        
        await cloudinary.uploader.destroy(imagePublicId, {
            invalidate: true,
        });

        await DailyMenu.findByIdAndDelete(id);

        res.status(200).json(menuVar);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createDailyMenu,
    getAllDailyMenus,
    getSingleDailyMenu,
    updateDailyMenu,
    deleteDailyMenu
};
