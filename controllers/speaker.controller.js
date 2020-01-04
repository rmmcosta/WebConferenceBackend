const index = require('./../models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const SpeakerModel = require('./../models/speaker');
const ConfSpeakerModel = require('./../models/conf_speaker');
const ConfSpeaker = ConfSpeakerModel(sequelize, Sequelize);
const Speaker = SpeakerModel(sequelize, Sequelize);
const { validationResult } = require('express-validator');

const saveSpeaker = function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (req.params.idspeaker > 0) {
        updateSpeaker(req);
    } else {
        createSpeaker(req);
    }

    function createSpeaker(req) {
        Speaker.create({
            name: req.body.name,
            filliation: req.body.filliation,
            bio: req.body.bio,
            foto: '',
            link: req.body.link,
            speakertypeId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(newSpeaker => {
                console.log(`New speaker ${newSpeaker.name}, with id ${newSpeaker.id} has been created.`);
                ConfSpeaker.create({
                    conferenceId: req.params.idconf,
                    speakerId: newSpeaker.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    .then(() => {
                        res.send(newSpeaker);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).send('Internal Server Error');
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            })
            ;
    }

    function updateSpeaker(req) {
        Speaker.update({
            name: req.body.name,
            filliation: req.body.filliation,
            bio: req.body.bio,
            link: req.body.link,
            updatedAt: new Date()
        }, { where: { id: req.params.idspeaker } })
            .then(updatedSpeaker => {
                console.log(updatedSpeaker);
                res.send('ok');
            })
    }
}

const readSpeakers = function (req, res) {
    if (req.params.idconf > 0) {
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

const readSpeaker = function (req, res) {
    Speaker.findAll(
        {
            where: {
                id: req.params.idspeaker
            }
        })
        .then(Speakers => {
            res.send(Speakers);
        });
}

const deleteSpeaker = function (req, res) {
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
module.exports.saveSpeaker = saveSpeaker;
module.exports.readSpeaker = readSpeaker;