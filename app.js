const express = require('express');
const products = require('./routes/products');
const dbConnect = require('./db/dbConnect');
const notFound = require('./middleware/notFound');
const start = require('./start');

const app = express();

app.use(express.json());
app.use('/api/v1/products', products);
app.use(notFound);


start(dbConnect, app);


// need to
// refactor any complexities
// create start()
// use joi validation
// use custom error handler
