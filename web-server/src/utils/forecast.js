const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=966f6f4dd336df53d2ea4f0e2422eaed&query=${latitude},${longitude}`;

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const data = body;
            callback(undefined, `${data.current.weather_descriptions[0]} It's currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out. The high today is ${data.current.temperature_max} with a low of ${data.current.temperature_min}. There is a ${data.current.precip}% chance of rain.`);
        }
    })
};

module.exports = forecast;