const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Jumbo'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: "Please help me.  I'm shrinking again...",
    name: 'Neil Singer'
  });
});


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide an address'
    });
  }

  geocode(req.query.address, (geoError, {lat, long, place}) => {
    if (geoError) {
      return res.send({
        error: geoError
      });
    }
    forecast(lat, long, (forecastError, forecast) => {
      if (forecastError) {
        return res.send({
          error: forecastError
        });
      }
      res.send({
        address: req.query.address,
        location: place,
        forecast
      });
    });
  });

});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error:  'You must provide a search term'
    });
  }

  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    errorMessage: 'Help article not found',
    name: 'Neil Singer'
  });
});


app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorMessage: 'My 404 Page',
    name: 'Neil Singer'
  });
});

app.listen(port, () => {
  console.log('listening on port' + port);
});
