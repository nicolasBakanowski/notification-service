require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async (message) => {
  return client.messages.create({ ...message, from: process.env.SMS_FROM, to: `${message.to}`}) 
}

module.exports = sendMessage