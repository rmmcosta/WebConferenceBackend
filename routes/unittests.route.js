const router = require('express').Router();
const connection = require('../config/connectMySQL');

router.get('/testDBConnection',function(req,res){
    connection.connect(function(err){
        if(err) {
            res.send('Database unavailable!');
        } else {
            res.send('Database connection ok.');
        }
    });
});

module.exports = router;