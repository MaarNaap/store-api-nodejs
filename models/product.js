const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 3 },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true, URL: true },
    images: [{ type: String, URL: true }]
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;