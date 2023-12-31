const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//define paths  for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name:'landry',
        location: 'kigali',
        created: 'landry'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        world: 'world',
        created: 'landry'})
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        helps: 'hello world i need a help',
        created: 'landry'
    })
})
app.get('/weather', (req, res) => {
  
    if (!req.query.address) {
        return res.send({
            error: 'please provide an address please!!'
        })
        
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
            
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    

  

})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'help article not found',
        created: 'landry'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'page not found',
        created: 'landry'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000..');
})