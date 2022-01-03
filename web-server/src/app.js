const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Emmanuel'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Emmanuel'
    });
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emmanuel'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error: error
                });
            }

            return res.send({
                forecast: forecastData,
                location: location,
                address: address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Emmanuel',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Emmanuel',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
