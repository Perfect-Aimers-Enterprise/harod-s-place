const productModel = require('../model/productModel')
const cloudinary = require('cloudinary').v2;

const createMenuProduct = async (req, res) => {
    console.log("Hello")
    try {
        console.log(req.file);

        const { menuProductName, menuDescription, menuPrice, variationSize, variationPrice } = req.body
        // menuImageUrl = req.file.filename
        if(!req.file){
            throw new Error ('No Image was uploaded')
        }
        menuImageUrl = req.file.path
         // Create a new menu product
         const menuProduct = await productModel.create({
            menuProductName,
            menuDescription,
            menuPrice,
            menuImage: menuImageUrl,
            variations: variationSize.map((size, index) => ({
                size: size,
                price: variationPrice[index]
            }))
        });
        

        if (!menuProduct) {
            return res.status(404).json({message: 'Please fill up all required field'})
        }

        res.status(201).json({menuProduct, message: 'Product uploaded Successfully'})
    } catch (error) {
        res.status(500).json({error, message: 'something went wrong'})
    }
}

const getMenuProducts = async (req, res) => {
    try {
        const menuProduct = await productModel.find().sort({ createdAt: -1 });
    // if (!menuProduct) {
    //     return res.status(404).json({message: 'No product Found'})
    // }

    res.status(201).json(menuProduct)
    } catch (error) {
        res.status(500).json({message: 'Error Fetching Product'})
    }
}

const getSingleMenuProduct = async (req, res) => {

    try {
        const { id:menuProductId } = req.params;
        const menuProduct = await productModel.findById({_id:menuProductId})
        res.status(201).json(menuProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteMenuProduct = async (req, res) => {
    try {
        const { id:menuProductId } = req.params
        const menuProduct = await productModel.findOne({_id:menuProductId})
        
        const oldImagePublicId = menuProduct.menuImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`menuImages/${oldImagePublicId}`);

        await productModel.deleteOne({_id:menuProductId});

        res.status(201).send('Product Successfully Deleted')
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateMenuProduct = async (req, res) => {
    try {
        const { id:menuProductId } = req.params
        const { menuProductName, menuDescription, menuPrice } = req.body;

        const menuProduct = await productModel.findOneAndUpdate(
            { _id:menuProductId},
            { menuProductName, menuDescription, menuPrice },
            { new: true, runValidators: true}
        )

        if (!menuProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        if(menuProduct) {
            const oldImagePublicId = menuProduct.menuImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`menuImages/${oldImagePublicId}`);
        }

        res.status(201).json(menuProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = { createMenuProduct, getMenuProducts, getSingleMenuProduct, deleteMenuProduct, updateMenuProduct}