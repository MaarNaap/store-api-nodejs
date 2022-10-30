const Product = require('../models/product');
const tryOrCatch = require('../middleware/tryCatch');

// const getAllProducts = tryOrCatch(async (req, res, next) => {
//         const products = await Product.find({}).select('id title price').sort({ price: -1 });
//         res.send({ status: 'Success', length: products.length, data: products });
// });

// using query parameters
const getAllProducts = tryOrCatch(async (req, res, next) => {
        // console.log(req.query);
        const { title, brand, inStock, search, sort, select, filters} = req.query;

        // filtering
        const queryParams = {};
        if (inStock) {
                // need default value here for queryParams.stock
                queryParams.stock = -Infinity;
                if (inStock === 'true') queryParams.stock = {$gte: 1};
                if (inStock === 'false') queryParams.stock = 0;
                // if (!isNaN(Number(inStock))) queryParams.stock = Number(inStock);
        };
        if (brand) {
                queryParams.brand = { $regex: brand, $options: 'i' };
        };
        if (title) {
                queryParams.title = { $regex: title, $options: 'i' };
        };
        if (search) {
                queryParams.$or = [{ description: { $regex: search, $options: 'i' } }, { title: { $regex: search, $options: 'i' } }, { category: { $regex: search, $options: 'i' } }, { brand: { $regex: search, $options: 'i' } }];
        };

        // sorting
        let sortList = 'id'
        if (sort) {
               sortList = sort.split(',').join(' ');
        };

        //selecting certain fields
        let selectList = []; // make it array of strings or just string, both are fine
        if (select) {
                selectList = select.split(','); // so join or not, both are fine
        };


        // pagination
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;


        // numeric filters
        if (filters) {
                // console.log(filters); // price>10 => price: {$gt:10}
                let filter = filters.split(',');
                const mapping = {
                        '>': '$gt',
                        '>=': '$gte',
                        '=': '$eq',
                        '<': '$lt',
                        '<=': '$lte'
                };
                const regex = /\b(>|>=|=|<|<=)\b/;
                filter.forEach((value) => {
                        const match = regex.exec(value);
                        if (!match) return;
                        value = value.replace(regex, `_${mapping[match[0]]}_`);
                        value = value.split('_');
                        const allowedNumericFilterFields = ['stock', 'price', 'rating', 'discountPercentage'];
                        if (allowedNumericFilterFields.includes(value[0])) {
                                queryParams[value[0]] = {};
                                queryParams[value[0]][value[1]] = Number(value[2]);
                        }
                });
        };

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
