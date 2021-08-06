'use strict';
require('dotenv').config();
const Shopify = require('shopify-api-node');

const {
  getClient,
  getLeadCampaignDataExtension,
  updateEmailPermission
} = require('./helpers/salesforceMcHelper');

const {
  createTimestamp
} = require('./helpers/createTimestamp');

const {
  sendEmailToCustomer
} = require('./helpers/simpleEmailService');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_DOMAIN,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_SECRET
});

module.exports.changeMarketingStatus = async (event) => {

  try {
    // Retrieve customer_email from form data
    const data = JSON.parse(event.body);
    const customer_email = data[2].value;

    // Create Timestamp for customer tag in JST -- AWS converts Date() to UTC/GMT 0:00
    // Even though this is in AP-Northeast Tokyo region ¯\_(ツ)_/¯
    const timestamp = createTimestamp();

    // The API search method returns and array of objs or an empty array
    const customer_search_array = await shopify.customer
      .search( {email: customer_email} )
      .catch((err) => console.error(err));
    // Get Shopify customer obj from search array if it exists
    const customer_search = customer_search_array[0];

    // If customer is not in Shopify create new customer
    if(customer_search_array.length === 0) {
      const new_customer = await shopify.customer
        .create({
          email: customer_email,
          tags: [ "MailUnsubscribe", `${timestamp}` ]
        })
        .catch((err) => console.error(err));
      // This is probably uneccessary as we are not updating marketing status in this instance.
      // const customer_id = new_customer.id
      console.log("Customer created: " + new_customer);
    }
    // If customer exists in Shopify set customer_id, update marketing status, and add tags
    else {
      // Assign customer_id for Update Method
      const customer_id = customer_search.id;
      // Grab existing tags from customer_search object
      const existing_tags = customer_search.tags;

      // Update Method + Adding new tags + Adding existing tags to tags array
      const updated_customer = await shopify.customer
        .update(customer_id, {
          accepts_marketing: "false",
          tags: [ `${existing_tags}`, "MailUnsubscribe", `${timestamp}` ]
        })
        .catch((err) => console.error(err));
        console.log("Returning updated customer: " + updated_customer);
    }

    // Functions to connect to and set Salesforce account.MailPermission = '0';
    const mcClient = getClient();

    await new Promise((resolve, reject) => {
      getLeadCampaignDataExtension(mcClient, customer_email, async (err, response) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const result = response && response.body ? response.body : response;

          for (let i = 0; i < result.Results.length; i++) {
            const obj = result.Results[i];
            const campaign = obj.Properties.Property.find(prop => prop.Name == 'CampaignID');
            if (campaign && campaign.Value) {
              //obj.Properties => Array of objects
              // { Name: 'MailPermission', Value: '1'  }
              // { Name: 'CampaignID', Value: 'xxxxxxx' }
              await updateEmailPermission(mcClient, customer_email, campaign.Value);
            }
          }

          resolve(result);
        }
      });
    });


    // Call SES Function to send customer succesfully unsubscribed email

    const email = await sendEmailToCustomer(customer_email);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(
      {
        message: 'You have successfully unsubscribed.',
        MessageId: email.MessageId
      }, null, 2),
    };
  } catch (e) {
    console.error(e);
  }
};
