const express = require('express');
const app = express();
const mongoose = require('mongoose');


main().then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Database connection error:', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});