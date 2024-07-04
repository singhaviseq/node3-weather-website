const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, '../public'));
const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); //in case if hbs views are in diff folder
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');  //for dynamic templating of pages, using handlebars npm package
app.set('views', viewsPath) // to tell Express where to find handlebars views! 
hbs.registerPartials(partialsPath) // to register the Partials
//Setup Static Directory to Serve
app.use(express.static(pubDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhishek Kumar'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Abhishek Kumar'
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        contact: '+1 020 223445',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'No Such Help Articles Found',
        title: '404',
        name: 'Abhishek Kumar'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        error: 'No such page exists',
        title: '404',
        name: 'Abhishek Kumar'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.');
});