const { Op } = require('sequelize');
const ProductModel = require('./model')


const getAllProduct = async (req, res) => {
    try {
        const { name, category, status } = req.query;

        const whereClause = {};

        if (name) {
            whereClause.name = { [Op.like]: `%${name}%` }; 
        }

        if (category) {
            whereClause.category = category;
        }

        if (status) {
            whereClause.status = status;
        }

        const products = await ProductModel.findAll({ where: whereClause });

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve products" });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.body.body;
    try {
        const product = await ProductModel.findOne({ where: { id: id } });
        res.status(200).json({success: true, data: product });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: "Failed to retrieve product" });
    }
}

const createNewProduct = async (req, res) => {
    const { name, description, price, offer_price, category, quantity_available, status } = req.body;

    try {


        const newproduct = await ProductModel.create({ name, description, price, offer_price, category, quantity_available, status })
        res.json({success: true, message:  "product created successfully", data: newproduct})

    } catch (error) {
        console.log("error", error)
        res.status(500).json({success: false, message: "failed to create product" });
    }
}

const updateProduct = async (req, res) => {
    const { name, description, price, offer_price, category, quantity_available, status } = req.body;
    const { id } = req.params;

    try {

        const newproduct = await ProductModel.update(
            { name, description, price, offer_price, category, quantity_available, status },
            { where: { id : id } })
        res.json({success: true, message:  "product updated successfully", data: newproduct})

    } catch (error) {
        console.log("error", error)
        res.status(500).json({success: false, message: "failed to update product" });
    }
}



module.exports = {
    getAllProduct,
    getProductById,
    createNewProduct,
    updateProduct
};

