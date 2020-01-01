const index = require('./../models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const SpeakerModel = require('./../models/speaker');
const ConfSpeakerModel = require('./../models/conf_speaker');
const ConfSpeaker = ConfSpeakerModel(sequelize, Sequelize);
const Speaker = SpeakerModel(sequelize, Sequelize);

const readSpeakers = function (req, res) {
    if (req.params.idconf>0) {
        ConfSpeaker.findAll(
            {
                where: {
                    ConferenceId: req.params.idconf
                },
                attributes: ['SpeakerId']
            })
            .then(result => {
                //console.log(result[0].dataValues.SpeakerId);
                let ids = [];
                result.forEach(element => {
                    ids.push(element.dataValues.SpeakerId);
                });
                console.log(ids);
                Speaker.findAll(
                    {
                        where: {
                            id: ids
                        }
                    })
                    .then(Speakers => {
                        res.send(Speakers);
                    });
            });
    } else {
        Speaker.findAll().then(Speakers => {
            res.send(Speakers);
        });
    }
}

const deleteSpeaker= function (req, res) {
    ConfSpeaker.destroy({
        where: {
            speakerid: req.params.idspeaker
        }
    });
    Speaker.destroy({
        where: {
            id: req.params.idspeaker
        }
    });
    res.send('ok');
}

module.exports.readSpeakers = readSpeakers;
module.exports.deleteSpeaker = deleteSpeaker;