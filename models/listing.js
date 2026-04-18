const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb",
    set: (v) =>
      v === ""
        ? '"https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb"'
        : v,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  } else {
    console.log("No document found to delete.");
  }});




const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
