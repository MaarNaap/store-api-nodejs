require('dotenv').config();
async function start(dbConnection, expressApp) {
    try {
        await dbConnection(process.env.MONGO_URI);
        const port = process.env.port || 3000;
        expressApp.listen(port, console.log(`Server on port ${port}`))
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = start;