const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing.js');

main().then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Database connection error:', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');
};

initDB();
