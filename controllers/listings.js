const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing} = require("../middleware");
const forwardGeocode = require("../utils/forwardGeoCode");

//index route

module.exports.index = async (req, res) => {
  const { location } = req.query;
  let allListings;
  if (location && location.trim() !== "") {
    allListings = await Listing.find({
      $or: [
        { location: { $regex: location, $options: "i" } },
        { country: { $regex: location, $options: "i" } },
        { title: { $regex: location, $options: "i" } },
      ],
    });
  } else {
    allListings = await Listing.find({});
  }
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
     res.render("listings/show.ejs", { listing });
   };
//create route
module.exports.createListing = async (req, res, next) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload an image.");
      return res.redirect("/listings/new");
    }
    const { latitude, longitude } = await forwardGeocode(
      req.body.listing.location,
    );
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
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
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true },
    );

    const { latitude, longitude } = await forwardGeocode(
      req.body.listing.location,
    );
    listing.latitude = latitude;
    listing.longitude = longitude;

    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
    }

    await listing.save();
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};
  //delete route
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted listing:", deletedListing);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
  };