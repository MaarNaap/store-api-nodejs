const express = require('express');
const products = require('./routes/products');
const dbConnect = require('./db/dbConnect');
const notFound = require('./middleware/notFound');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/v1/products', products);
app.use(notFound);

async function start() {
    try {
        await dbConnect(process.env.MONGO_URI);
        const port = process.env.port || 3000;
        app.listen(port, console.log(`Server on port ${port}`))
    }
    catch (error) {
        console.log(error);
    }
};
start();