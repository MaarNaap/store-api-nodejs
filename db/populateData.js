const Product = require('../models/product');
const dbConnect = require('./dbConnect');
const producsData = require('../products.json');

async function populate() {
    try {
        await dbConnect();
        await Product.deleteMany();
        await Product.create(producsData);
        console.log('success');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

populate();

// Run this once to populate the data from the json file to the db
