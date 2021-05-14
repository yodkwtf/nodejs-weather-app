const path = require('path');
const express = require('express');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();
const hbs = require('hbs');

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup static(public) directory
app.use(express.static(publicDirectoryPath));

// setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// using hbs files of views folder
app.get('/', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Deekayy' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Durgesh' });
});
app.get('/help', (req, res) => {
  res.render('help', {
    msg: `We're here to help you`,
    title: 'Help Page',
    name: 'yodkwtf',
  });
});
app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    name: 'Deekayy',
    msg: 'Help article not found',
  });
});

// sending data mannually
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide a location :)',
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      // if wrong location
      if (error) {
        return res.send({ error });
      }
      // else
      forecast(longitude, latitude, (error, forecastData) => {
        // IF WRONG COORDINATES
        if (error) {
          return res.send({ error });
        }
        // ELSE
        res.send({ forecastData, location, address: req.query.address });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query);
  res.send({ products: [] });
});

// 404 pages with handlebars (must be at the end)
app.get('*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    name: 'Deekayy',
    msg: 'Page not found',
  });
});
// to start the server up
app.listen(3000, () => console.log('Server is up on port 3000.'));
