const Product = require('../models/product');
const tryOrCatch = require('../middleware/tryCatch');
const getQueryParams = require('../middleware/queryParams');

// const getAllProducts = tryOrCatch(async (req, res, next) => {
//         const products = await Product.find({}).select('id title price').sort({ price: -1 });
//         res.send({ status: 'Success', length: products.length, data: products });
// });

// using query parameters
const getAllProducts = tryOrCatch(async (req, res, next) => {
        const { queryParams, sortList, selectList, limit, skip } = getQueryParams(req.body);
        const products = await Product.find(queryParams).sort(sortList).select(selectList).limit(limit).skip(skip);
        res.send({ status: 'Success', length: products.length, data: products });
});

const getOneProduct = tryOrCatch(async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Invalid id');
        res.send({ status: 'Success', data: product });
});

const createProduct = tryOrCatch(async (req, res, next) => {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
});

const deleteProduct = tryOrCatch(async (req, res, next) => {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Invalid id');
        res.send(product);
});

const updateProduct = tryOrCatch(async (req, res, next) => {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).send('Invalid id');
        res.send(product);
});

module.exports = {
    getAllProducts, getOneProduct, deleteProduct, updateProduct, createProduct
};
