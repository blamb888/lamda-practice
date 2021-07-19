'use strict';
require('dotenv').config();

const {
  sendEmailToCustomer
} = require('./docuFunction');

module.exports.simpleEmail = async (event) => {
  console.log("Sending test email...");
  console.log(FROM_EMAIL);
  const email = await sendEmailToCustomer('brandon@flagship.cc')

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(
      {
        message: 'Hopefully this sent an email',
        MessageId: email.MessageId
      }, null,2
    ),
  };
};

