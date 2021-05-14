const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bb46c144255e840c7ebde90dcdce22c5&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    // low level error
    if (error) {
      callback('Unable to connect', undefined);
    }

    // if no response got
    else if (body.error) {
      callback(body.error.info, undefined);
    }

    // if response got
    else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        apparent_temp: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
