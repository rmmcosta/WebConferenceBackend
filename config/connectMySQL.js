const mysql = require('mysql');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
//console.log(config);

const connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

module.exports = connection;