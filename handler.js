'use strict';
require('dotenv').config();
const aws = require('aws-sdk');
const ses = new aws.SES();

const {
  sendEmailToCustomer
} = require('./ses.js');

module.exports.SES = async (event) => {
  console.log("Sending Email to customer: ")

  const simpleService = sendEmailToCustomer('brandon@flagship.cc');

  console.log("Simple service ran and returned this: " + simpleService);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(
      {
        message: 'Hopefully this sent an email',
      }, null,2
    ),
  };
};

module.exports.roundTwo = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'This is my first AWS lambda function written in Nodejs.',
      },
      null,
      2
    ),
  };
};
