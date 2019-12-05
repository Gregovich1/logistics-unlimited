// import package for MS SQL package
const sql = require('mssql')

// parameters for database connection
const config = {
    user: 'admin',
    password: 'capstone1',
    server: 'database-1.ctrqljmft4jn.us-east-1.rds.amazonaws.com',
    database: 'Logistics_Unlimited'
}
// function to establish connection pool. This will be used for each api endpoint.
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
    console.log('Connected to MSSQL')
    return pool
    }).catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql, poolPromise
}