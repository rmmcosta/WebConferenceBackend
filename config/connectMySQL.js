const mysql = require('mysql');
const config = require('./config.json');
//console.log(config);

const connection = mysql.createConnection({
    host: config.MySQL.host,
    user: config.MySQL.user,
    password: config.MySQL.password,
    database: config.MySQL.database
});

module.exports = connection;