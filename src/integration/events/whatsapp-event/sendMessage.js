require('dotenv').config()


const sendMessage = async (message) => {
  console.log(process.env.TWILIO_AUTH_TOKEN)
  const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return client.messages.create({ ...message, from: process.env.WSP_FROM, to: `whatsapp:${message.to}`}) 
}

module.exports = sendMessage