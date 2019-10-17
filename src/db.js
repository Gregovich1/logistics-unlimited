const sql = require('mssql')

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
    .query('select * from trucks')
}).then(result => {
    console.log(result)
    // Stored procedure
    return pool.request()
}).catch((e) => {
    console.log(e)
})