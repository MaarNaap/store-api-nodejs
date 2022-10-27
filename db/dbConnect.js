const mongoose = require('mongoose');
function dbConnect(url) {
    return mongoose.connect(url).then(() => { console.log('connected to db..'); return true}).catch(err => { console.log(err);  console.log('Error db..')});
};

module.exports = dbConnect;
