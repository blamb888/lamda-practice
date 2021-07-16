'use strict';
const {
  sendEmailToCustomer
} = require('./ses');

module.exports.hello = async (event) => {
  console.log("Sending Email to customer: ")
  sendEmailToCustomer('brandon@flagship.cc');

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello world!',
        input: event,
      },
      null,
      2
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
