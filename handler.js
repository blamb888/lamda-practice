'use strict';
require('dotenv').config();
const AWS = require('aws-sdk');
const SES = new AWS.SES({apiVersion: '2010-12-01'});
AWS.config.update({region: 'us-east-1'});

const {
  sendEmailToCustomer
} = require('./ses');

module.exports.SES = async (event) => {
  const simpleService = sendEmailToCustomer('brandon@flagship.cc');

  console.log("Simple service ran and returned this: " + simpleService);
  console.log("This was the event: " + event);

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
