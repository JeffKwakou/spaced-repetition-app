const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports.connect = () => {
    try {
        mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
        console.log('Connected to DB!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
}

module.exports.closeDatabase = () => {
    try {
        mongoose.connection.close()
        console.log('DB closed!');
    } catch (err) {
        console.log('Failed to disconnect to MongoDB', err);
    }
}