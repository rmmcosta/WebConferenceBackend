const connect = require('../config/connectMySQL');
const jsonMessagesFolder = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesFolder+"db");

const saveParticipant = function (req,res){
    console.log(req);
    res.send('ok');
}

const readParticipants = function(req, res) {
    res.send('ok');
}

const deleteParticipant = function(req,res) {
    res.send('ok');
}

/*function(req,res){
    console.log('post participants');
    let result = participant.participantCreate(req.body.name,req.body.email);
    res.send('Participant created: ' + JSON.stringify(result));
} */

module.exports.readParticipants = readParticipants;
module.exports.saveParticipant = saveParticipant;
module.exports.deleteParticipant = deleteParticipant;