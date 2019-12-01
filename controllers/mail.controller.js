"use strict";
const nodemailer = require("nodemailer");
const { validationResult } = require('express-validator');

const sendEmail = function (req, res) {
    //validate if any errors where indetified during the parse of the request
    const errors = validationResult(req);
    //console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let inputedEmail = req.body.email;
    let inputedName = req.body.name;
    let inputedPhone = req.body.phone;
    let inputedMsg = req.body.msg;
    console.log(req.body);
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            res.status(500).end();
        }

        console.log('Credentials obtained, sending message...');

        const mailtrapConfig = {
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "10f46c6f1b407b",
                pass: "57ffb9ec12707f"
            }
        };

        const gmailConfig = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: "webconferencerc@gmail.com",
                pass: "914423167"
            }
        };

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport(mailtrapConfig);

        let emailHtml = '';
        emailHtml += 'Dear ' + inputedName + ',<br><br>';
        emailHtml += 'Thank you for your contact!<br><br>';
        emailHtml += 'Message received: <blockquote><i>';
        emailHtml += inputedMsg + '<br><hr>';
        emailHtml += 'Your contacts are:<br>';
        emailHtml += 'email:<a href="mailto:'+inputedEmail+'">'+inputedEmail+'</a><br>';
        emailHtml += 'phone number:' + inputedPhone; 
        emailHtml += '</i></blockquote>';
        emailHtml += '<img src="../assets/images/mail-icon.png" alt="mail.icon" height=42 width=42>';

        // Message object
        let message = {
            from: 'Site Manager <webconferencerc@gmail.com>',
            to: 'Contactor <'+inputedEmail+'>',
            subject: 'Web Conference RC - Site Contact',
            html: emailHtml
        };


        /*console.log('verify connection');
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });*/

        console.log('Send email.');

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                res.status(500).end();
            } else {
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.send();
            }
        });
    });
};

module.exports.sendEmail = sendEmail;