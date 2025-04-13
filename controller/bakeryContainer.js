const Bakery = require('../model/bakeryModel')

const requestBakery = async (req, res) => {
    try {
        const bakeryVar = await Bakery.create({...req.body})
        res.status(201).json(bakeryVar)
        console.log('Hello')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllBakery = async (req, res) => {
    try {
        const getBakeryVar = await Bakery.find().sort({ createdAt: -1 })
        res.status(200).json(getBakeryVar)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { requestBakery, getAllBakery }