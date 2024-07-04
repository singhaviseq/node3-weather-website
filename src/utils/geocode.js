const request = require('request');


// const tomtomURL = 'https://api.tomtom.com/search/2/geocode/Ayyappa%20Nagar%20Hoodi.json?key=sdzajQuedLQR2NsYApDAAsYdnM832YkX';

const geocode = (location, callback) => {
    const url = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(location) + '.json?key=sdzajQuedLQR2NsYApDAAsYdnM832YkX';
    request({ url }, (error, response) => {
        const data = JSON.parse(response.body);
        if (error) {
            callback('Unable to connect to Location Services', undefined);
        }
        else if (data.results[0] === undefined) {
            callback('Could not find the location, Please try again', undefined);
        }
        else {
            callback(undefined, {
                latitude: data.results[0].position.lat,
                longitude: data.results[0].position.lon,
                location: data.results[0].address.freeformAddress
            });
        }
    })
}

module.exports = geocode;





