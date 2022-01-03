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
            callback(undefined, `${data.current.weather_descriptions[0]} It's currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`);
        }
    })
};

module.exports = forecast;