const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing} = require("../middleware");

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
     res.render("listings/show.ejs", { listing,  });
   };
//create route
module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
  };
 //edit route
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  };
  //update route
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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