require('dotenv').config();
async function start(dbConnection, expressApp) {
    try {
        const connection = await dbConnection(process.env.MONGO_URI);
        const port = process.env.port || 3000;
        if(connection) expressApp.listen(port, ()=> console.log(`Server on port ${port}`))
    }
    catch (error) {
        console.log('Can\'t connect to server..');
        console.log(error);
    }
}

module.exports = start;