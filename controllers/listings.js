const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing} = require("../middleware");
const forwardGeocode = require("../utils/forwardGeoCode");

//index route

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//new route

module.exports.renderNewForm = (req, res) => {
   res.render("listings/new.ejs");
};

//show route
 module.exports.showListing = async (req, res) => {
     const { id } = req.params;
     const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
     if (!listing) {
       req.flash("error", "Cannot find that listing!");
       return res.redirect("/listings");
     } 
     console.log("Listing owner:", listing.owner);
     res.render("listings/show.ejs", { listing });
   };
//create route
module.exports.createListing = async (req, res, next) => {
  try {
    // Get coordinates from location
    const { latitude, longitude } = await forwardGeocode(
      req.body.listing.location,
    );

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.latitude = latitude; 
    newListing.longitude = longitude; 
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};
 //edit route
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings");
    }

   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload/", "/upload/w_250/");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  };
  //update route
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if( typeof req.file !== "undefined" && req.file.path !== listing.image.url) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
    }

    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
  };
  //delete route
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted listing:", deletedListing);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
  };