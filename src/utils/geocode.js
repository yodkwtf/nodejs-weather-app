const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGVla2F5eSIsImEiOiJja29pdGhqMjAwM2R4MnVtbGw4MG5ydGtyIn0.GG7Ddv4mM1c61qu-groh9w&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    // low level error -> sending error to callback
    if (error) {
      callback(`Unable to connect`, undefined);
    }

    // error for wrong location
    else if (body.message == 'Forbidden' || body.features.length === 0) {
      callback(`Unable to find location :/`, undefined);
    }

    // no error
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
