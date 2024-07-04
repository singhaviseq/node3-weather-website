const request = require('request');

// const url = 'http://api.weatherapi.com/v1/current.json?key=d56a4d8a59a34504b10135624240306&q=25.55,84.66&aqi=yes';

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=d56a4d8a59a34504b10135624240306&q=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&aqi=yes';
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast weather services', undefined);
        }
        else if (response.body.error) {
            callback(response.body.error.message, undefined);
        }
        else {
            callback(undefined, 'It is currently ' + response.body.current.temp_c + ' degrees Celsius in ' + response.body.location.name + ',' + response.body.location.region + ". The winds are flowing at " + response.body.current.wind_kph + ' kph.')
        }
    })
}

module.exports = forecast;