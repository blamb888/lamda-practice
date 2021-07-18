var aws = require("aws-sdk");
var ses = new aws.SES({ region: "ap-northeast-1" });

const sendEmailToCustomer = async(customer_email) => {
// THIS WORKS --->
  var params = {
    Destination: {
      ToAddresses: [customer_email],
    },
    Message: {
      Body: {
        Text: { Data: "Test" },
      },
      Subject: { Data: "Test Email" },
    },
    Source: "blamb888@gmail.com",
  };

  return ses.sendEmail(params).promise()
}

module.exports = {
  sendEmailToCustomer
}
