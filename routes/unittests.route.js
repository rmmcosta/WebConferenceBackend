const router = require('express').Router();
const connection = require('../config/connectMySQL');
const index = require('./../models/index');
const sequelize = index.sequelize;

router.get('/testDBConnection',function(req,res){
    connection.connect(function(err){
        if(err) {
            res.send('Database unavailable!');
        } else {
            res.send('Database connection ok.');
        }
    });
});

router.get('/testSequelizeConnection', function(req,res){
    sequelize
        .authenticate()
        .then(()=>{
            res.send('Sequelize connected to the database with success.');
        })
        .catch(err =>{
            res.send('Unable to connect to the database: '+err);
        });
});

module.exports = router;