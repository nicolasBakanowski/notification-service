require('dotenv').config()


const sendMessage = () => {
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    try{
        const message = await client.messages
        .create({
           from: process.env.WSP_FROM,
           body: 'Hello, there!',
           to: 'whatsapp:+5493584158246'
        })
        return message
    }catch(error){
        return error
    }   
     
}

module.exports = {sendMessage}