const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const messageStatusRoute = require('./routes/message.status.route')
const app = express();
console.log(process.env)

const whatsAppNotification = require("./integration/events/whatsapp/wa-notification-event");
const smsNotification = require("./integration/events/sms/sms-notification-event");
const emailNotification = require("./integration/events/email/email-notification-event");

//whatsAppNotification()
//smsAppNotification()
//emailNotification()

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors({
    origin: 'https://www.twilio.com'
}));

app.use('/message-status', messageStatusRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`)
})