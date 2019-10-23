const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyparser = require('body-parser')
const sql = require('mssql')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewspath)
app.set('view engine', 'hbs')
app.use(bodyparser.urlencoded( {extended: true} ))
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

// route handlers. add properties if desired
app.get('', (req, res) => {
    res.render('index', {
        title: 'Logistics Unlimited'
    })
})

app.get('/users', (req, res) => {
    res.render('users', {
        title: 'Logistics Unlimited'
    })
})
app.get('/trucks', (req, res) => {
    const config = {
        user: 'admin',
        password: 'capstone1',
        server: 'database-1.ctrqljmft4jn.us-east-1.rds.amazonaws.com',
        database: 'Logistics_Unlimited',
    }
    
    sql.connect(config).then(() => {
        return sql.query('select * from Trucks ')
    }).then(result => {
        console.log('It did not fail')
        res.send(result.recordsets)
    }).catch(err => {
        console.log('got an error')
        console.log(typeof(err))
        console.log(err)
    })
     
    sql.on('error', err => {
        console.log(err)
    })
})
app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'My Profile'
    })
})

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})