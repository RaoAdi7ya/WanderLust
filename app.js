const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');



main().then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Database connection error:', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

//index route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {  allListings });
});

//new route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

//show route
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
    
});
//create route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
});
//edit route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
});
//update route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
   await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
       res.redirect(`/listings/${id}`);
}); 
//delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log('Deleted listing:', deletedListing);
    res.redirect('/listings');
});  


// app.get('/testListing', async (req, res) => {
//   let sampleListing = new Listing({
//     title: 'My New Villa',
//     description: 'by the beach.',
//     image: '',
//     price: 1200,
//     location: 'Calangute, Goa',
//     country: 'India'
//   });
//   await sampleListing.save();
//   console.log('Sample listing saved to database');
//   res.send('Sample listing created and saved to database');
//   res.json(sampleListing);
// });


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});