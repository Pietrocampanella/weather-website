const request = require('request')

// recreate the functions with a callback abstraction and in a reusable way

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGlldHJvY2FtcGFuZWxsYSIsImEiOiJja2ljOTh2cXIxN2d5MnJzM2N2d2J5cXIzIn0.8LHoESp34adjMm9wFBzcMA&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            const {center, place_name:location} = body.features[0]
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location
            })
        }
    })
}

module.exports = geocode