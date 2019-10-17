const express = require('express')
const path = require('path')
const hbs = require('hbs')
const sql = require('mssql')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

const config = {
    user: 'admin',
    password: 'capstone1',
    server: 'database-1.ctrqljmft4jn.us-east-1.rds.amazonaws.com',
    database: 'database-1'
}

sql.connect(config).then(pool => {
    // Query
    return pool.request()
    .input('input_parameter', sql.Int, value)
    .query('select * from mytable where id = @input_parameter')
}).then(result => {
    console.dir(result)
    // Stored procedure
    return pool.request()

})

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