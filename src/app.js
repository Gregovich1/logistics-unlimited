const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyparser = require('body-parser')
const { poolPromise } = require('./db')

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
    res.render('trucks')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/faq', (req, res) => {
    res.render('faq')
})

app.get('/users/:user', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(`select * from Employee where employee_id = '${req.params.user}'`)
            .then((result) => {
                const data = result.recordset
                const goodData = JSON.parse(JSON.stringify(data[0]))
                console.log(goodData.city)

                res.render('profile', { first_name: goodData.first_name,
                    last_name: goodData.last_name,
                    employee_email: goodData.employee_email,
                    phone_number: goodData.phone_number
                 })
            })   
    } catch (err) {
        res.status(403)
        res.send(err.message)
    }
    
})

//not sure if this will be used.
app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'My Profile'
    })
})

//api endpoints
app.get('/api/trucks', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query('select * from Trucks')      
        res.json(result.recordset)
      } catch (err) {
        res.status(500)
        res.send(err.message)
      }
    })

app.get('/api/users', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query('select * from Employee')      
        res.json(result.recordset)
      } catch (err) {
        res.status(500)
        res.send(err.message)
      }
})

app.get('/api/users/:user', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(`select * from Employee where employee_email = '${req.params.user}'`)      
        res.json(result.recordset)
    } catch (err) {
        res.status(403)
        res.send(err.message)
    }
})
app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})