"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");

const { exec } = require("child_process");

const Email = require('email-templates');

const email = new Email();

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    const html = await email
		  .render('table')

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      auth: {
        user: 'daniel.622.guerrero@gmail.com', // generated ethereal user
        pass: 'abhwthvyeqbbnwdc', // generated ethereal password
      },
    });

    // send mail with defined transport object
    return transporter.sendMail({
      from: '"Daemon" <daniel.622.guerrero@gmail.com>', // sender address
      to: "daniel.622.guerrero@gmail.com", // list of receivers
      subject: "This one ✔", // Subject line
      html: html 
    }).then((info) => {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

}

main().catch(console.error);
