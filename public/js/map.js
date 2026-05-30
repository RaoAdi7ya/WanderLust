const mapContainer = document.getElementById("map");

// Get data from window object
const mapToken = window.mapToken;
const listing = window.listingData;
console.log(mapToken);

if (mapContainer && typeof maplibregl !== "undefined" && mapToken && listing) {
  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`,
    center: [listing.longitude, listing.latitude], // Default to Delhi if geocoding fail
    zoom: 14,
  });

  new maplibregl.Marker({ color: "#FF5A5F" })
    .setLngLat([listing.longitude, listing.latitude]) // Default to Delhi if geocoding fail
    .setPopup(
      new maplibregl.Popup().setHTML(`
          <h5>${listing.title}</h5>
          <p>${listing.location}</p>
        `),
    )
    .addTo(map);
} else {
  console.error("Map initialization failed:", {
    hasContainer: !!mapContainer,
    hasMaplibregl: typeof maplibregl !== "undefined",
    hasToken: !!mapToken,
    hasListing: !!listing,
  });
}
