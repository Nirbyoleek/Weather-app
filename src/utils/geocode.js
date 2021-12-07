const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlyYnlvbGVlayIsImEiOiJja3dnYXF4a3owM240MzJvd3E5amJzdGk1In0._6WQ8JyBs30iySYOQV5vpA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "No matching results for this location. Please try another one",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
