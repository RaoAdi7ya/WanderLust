const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb',
        set: (v) => v === '' ? '"https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb"' : v

    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }

});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;