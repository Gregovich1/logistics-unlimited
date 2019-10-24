const sql = require('mssql')

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
    console.log(result.recordsets)
}).catch(err => {
    console.log('got an error')
    console.log(typeof(err))
    console.log(err)
})
 
sql.on('error', err => {
    console.log(err)
})

const selectAll = (config, table) => {

}

const getUserId = (config, table) => {

}

