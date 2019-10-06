const router = require('express').router();
const participant = require('../controllers/participant.controller');

router.post('/participants',function(req,res){
    console.log('post participants');
    participant.participantCreate(req.body.name,req.body.email);
});

module.exports = router;