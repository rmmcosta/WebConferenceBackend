"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
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
        let transporter = nodemailer.createTransport(gmailConfig);

        // Message object
        let message = {
            from: 'Sender Name <ricardocosta101085@gmail.com>',
            to: 'Recipient <ricardo.costa@outsystems.com>',
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: '<p><b>Hello</b> to myself!</p>'
        };


        console.log('verify connection');
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        console.log('Send email.');

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

const sendEmail = function (req, res) {
    console.log(req.body);
    sendMail()
        .then(res.send())
        .catch(res.status(500).end());
};

module.exports.sendEmail = sendEmail;