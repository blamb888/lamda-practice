const AWS = require('aws-sdk');
const SES = new AWS.SES({region: 'ap-northeast-1'});


const sendEmailToCustomer = async(customer_email) => {

  const SES_FROM_EMAIL_ADDRESS = "brandon+from@flagship.cc";
  // const customer_email = "brandon@flagship.cc";
  const email_template = "<h1>Hello there!</h1>";
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

  const sendPromise = SES.sendEmail(emailParams).promise();

  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
        console.error(err, err.stack);
      });
  console.log(sendPromise);
}

// sendEmailToCustomer('brandon@flagship.cc');
module.exports = {
  sendEmailToCustomer
}
