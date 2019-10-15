const express = require('express')
const path = require('path')
const hbs = require('hbs')
const mysql = require('mysql')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

// route handlers. add properties if desired
app.get('', (req, res) => {
    res.render('index', {
        title: 'Logistics Unlimited'
    })
})

app.get('/signin', (req, res) => {
    res.render('signin', {
        title: 'Logistics Unlimited'
    })
})

app.get('/profile', (req, res) => {
    res.render('profile.hbs', {
        title: 'My Profile'
    })
})

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})