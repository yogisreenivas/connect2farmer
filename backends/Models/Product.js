const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    }
}, { timestamps: true });

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
