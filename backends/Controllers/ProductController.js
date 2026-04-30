const ProductModel = require('../Models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;
        const newProduct = new ProductModel({
            name,
            price,
            description,
            image,
            category
        });
        await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: newProduct
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        
        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updatedProduct
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        
        res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
