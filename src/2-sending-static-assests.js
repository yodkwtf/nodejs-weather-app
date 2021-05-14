// lecture 45
const path = require('path');
const express = require('express');

// playing with path module
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

// customizing server with use (sending data with static files)
app.use(express.static(publicDirectoryPath));

// sending data mannually
app.get('/weather', (req, res) => {
  res.send({ forecast: '50 deg', location: 'Guragon, Haryana' });
});

// to start the server up
app.listen(3000, () => console.log('Server is up on port 3000.'));
