// lecture 44
const express = require('express');

const app = express();

// using a method
app.get('/', (req, res) => {
  // allows to send something back
  res.send('<h1>Hello Express!</h1>');
});

// new routes
app.get('/help', (req, res) => {
  res.send([
    { name: 'Deekayy', age: 19 },
    { name: 'Raja', age: 29 },
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h2>About Page</h2>');
});

app.get('/weather', (req, res) => {
  res.send({ forecast: '50 deg', location: 'Guragon, Haryana' });
});

// to start the server up
app.listen(3000, () => console.log('Server is up on port 3000.'));
