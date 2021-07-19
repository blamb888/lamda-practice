const aws = require("aws-sdk");
const ses = new aws.SES({ region: "ap-northeast-1" });

import { emailTemplate } from "./emailTemplate";

const sendEmailToCustomer = async(customer_email) => {
  const email_template = emailTemplate();
// THIS WORKS --->
  const params = {
    Destination: {
      ToAddresses: [customer_email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `${email_template}`
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'メール配信停止のご依頼を承りました'
      },
    },
    Source: "blamb888@gmail.com",
  };

  return ses.sendEmail(params).promise()
}

module.exports = {
  sendEmailToCustomer
}
