const maptiler = require("@maptiler/client");

maptiler.config.apiKey = process.env.MAPTILER_KEY;

async function forwardGeocode(location) {
  try {
    const response = await maptiler.geocoding.forward(location, {
      limit: 1,
    });

    if (response.features && response.features[0]) {
      const [longitude, latitude] = response.features[0].geometry.coordinates;

      return { latitude, longitude };
    }

    return { latitude: 28.5355, longitude: 77.391 };
  } catch (err) {
    console.log(err);
    return { latitude: 28.5355, longitude: 77.391 };
  }
}

module.exports = forwardGeocode;
