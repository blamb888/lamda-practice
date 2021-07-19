'use strict';
require('dotenv').config();
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "ap-northeast-1" });

const {
  emailTemplate
} = require('./emailTemplate');

const sendEmailToCustomer = async(customer_email) => {
  const FROM_EMAIL = process.env.SES_FROM_EMAIL_ADDRESS;
  // const FROM_EMAIL = 'blamb888@gmail.com';
  console.log(FROM_EMAIL);
  const EMAIL_TEMPLATE = emailTemplate();
  const SUBJECT = 'メール配信停止のご依頼を承りました';
  const CHARSET = 'UTF-8';
// THIS WORKS --->
  const params = {
    Destination: {
      ToAddresses: [customer_email],
    },
    Message: {
      Body: {
        Html: {
          Charset: `${CHARSET}`,
          Data: `${EMAIL_TEMPLATE}`
        },
      },
      Subject: {
        Charset: `${CHARSET}`,
        Data: `${SUBJECT}`
      },
    },
    Source: `${FROM_EMAIL}`,
  };

  return ses.sendEmail(params).promise()
}

module.exports = {
  sendEmailToCustomer
}

// sendEmailToCustomer('brandon+from@flagship.cc');
