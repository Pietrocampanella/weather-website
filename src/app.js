const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths to Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Pietro Campanella'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Pietro Campanella'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Pietro Campanella',
        helpMessage: 'This is a help message'
    })
})

// app.com/weather 
app.get('/weather', (req, res) => {
    
    // check that address was provided
    if (!req.query.address) {
        return res.send({
            error: 'Yu must enter an address'
        })
    }

    // transform from address to coordinates
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        // check for errors in geolocation API
        if (error) {
            return res.send({error})
        }

        // find forecast for coordinates
        forecast(longitude, latitude, (error, weatherData) => {
            // check for errors in weather API
            if (error) {
                return res.send({error})
            }

            // return data results and location
            res.send({
                location,
                forecast: weatherData,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Help page not found',
        name: 'Pietro Campanella'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'My 404 message',
        name: 'Pietro Campanella'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})