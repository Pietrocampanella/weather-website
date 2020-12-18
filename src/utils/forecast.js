const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06c999c8f2b0ed69e14f2aa61c3fe12f&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const {temperature, weather_descriptions:description, humidity} = body.current
            callback(undefined, description[0] + '. It is currently ' + temperature + '°C outside and there is a humidity level of ' + humidity + '%.')
        }
    })
}

module.exports = forecast