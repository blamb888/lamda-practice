'use strict';
require('dotenv').config();
const aws = require('aws-sdk');
const ses = new aws.SES();

// const {
//   sendEmailToCustomer
// } = require('./ses');


const SES_FROM_EMAIL_ADDRESS = "brandon+from@flagship.cc";
const customer_email = "brandon@flagship.cc";
const email_template = "<h1>Hello there!</h1>";

module.exports.SES = async (event) => {
  console.log("Sending Email to customer: ")
  // sendEmailToCustomer('brandon@flagship.cc');

console.log("This is the FROM email: " + SES_FROM_EMAIL_ADDRESS);
    console.log("This is the TO email: " + customer_email);

    const emailParams = {
        Source: SES_FROM_EMAIL_ADDRESS,
        ReplyToAddresses: [SES_FROM_EMAIL_ADDRESS],
        Destination: {
          ToAddresses: [customer_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `<h1>Thanks for your message:</h1> ${customer_email}\n\n
              <h3>I will reply as soon as possible\n Cheers, \n -- Brandon</h3>
              ${email_template}`,
              // TODO Insert HTML for pages/unsubscribe-success.liquid here ^
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'メール配信停止のご依頼を承りました',
          },
        },
    };

    console.log(emailParams)

    const sendPromise =  new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(emailParams).promise();
    console.log(sendPromise);

    sendPromise.then(
      function(data) {
        console.log(data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });

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
