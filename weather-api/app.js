const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//read location from command line
const location = process.argv[2];

if (location) {

    geocode(location, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return console.log(error);
            }

            console.log('Location:', location);
            console.log('Forecast:', forecastData);
        });
    });
} else {
    console.log('No location provided');
}
