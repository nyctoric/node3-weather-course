const request = require('request');

//provides access to an error string, and an object with place, lat, and long via the callback
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmVpbGpzaW5nZXIiLCJhIjoiY2p4a2xhYjkzMW9uYjNubzhna3gwY3phdCJ9.YUmVVHN6u-bhoKRuhu0_fg&limit=1';
  request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to location services', undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find that location.', {
          place: undefined,
          lat: undefined,
          long: undefined
        });
      } else {
        callback(undefined, {
          place: body.features[0].place_name,
          lat: body.features[0].center[1],
          long: body.features[0].center[0]
        });
      }
  });
};

module.exports = geocode ;
