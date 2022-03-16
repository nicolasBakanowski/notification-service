require('dotenv').config()


const sendMessage = async () => {
  console.log(process.env.TWILIO_AUTH_TOKEN)
  const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return client.messages
    .create({
      from: process.env.WSP_FROM,
      body: 'Hello, there!',
      to: 'whatsapp:+5493584158246'
    }) 
}

module.exports = sendMessage