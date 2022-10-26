const mongoose = require('mongoose');
function dbConnect(url) {
    return mongoose.connect(url).then(console.log('connected to db..')).catch(err => console.log(err));
};

module.exports = dbConnect;
