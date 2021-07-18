'use strict';
require('dotenv').config();
// var aws = require("aws-sdk");
// var ses = new aws.SES({ region: "ap-northeast-1" });

const {
  sendEmailToCustomer
} = require('./docuFunction');

module.exports.simpleEmail = async (event) => {
  console.log("Sending test email...");
  // console.log("Test email sent.");
  sendEmailToCustomer('brandon@flagship.cc')


  // console.log("Simple service ran and returned this: " + simpleService);
  // console.log("This was the event: " + event);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(
      {
        message: 'Hopefully this sent an email',
      }, null,2
    ),
  };


// THIS WORKS --->
  // var params = {
  //   Destination: {
  //     ToAddresses: ['brandon@flagship.cc'],
  //   },
  //   Message: {
  //     Body: {
  //       Text: { Data: "Test" },
  //     },
  //     Subject: { Data: "Test Email" },
  //   },
  //   Source: "blamb888@gmail.com",
  // };

  // return ses.sendEmail(params).promise()
};

