const request = require('request');

//provides access to an error string and a forecast string via the callback
const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/87c2171ae0caaf7ef7b2cc9e72f196a9/' + lat + ',' + long ;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('sorry.  unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
    }
  });
};


module.exports = forecast ;
