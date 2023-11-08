const Pool = require("pg").Pool


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL
// })



// local
const pool = new Pool({
    user: "postgres",
    password: "Sunny0828",
    database: "thakbong_database",
    host: "localhost",
    port: 5432
})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool