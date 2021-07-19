'use strict';
require('dotenv').config();

const {
  sendEmailToCustomer
} = require('./helpers/docuFunction');

module.exports.simpleEmail = async (event) => {
  console.log("Sending test email...");
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

