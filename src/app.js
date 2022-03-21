const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const helmet = require('helmet');
//const sendWhatsApp = require("./integration/events/whatsapp-event/whatsapp-event");
const messageStatusRoute = require('./routes/message-status-route')
require('dotenv').config()
const app = express();
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// gzip compression

// enable cors
app.use(cors({
    origin: 'https://www.twilio.com'
}));

app.use('/message-status', messageStatusRoute);

//sendWhatsApp()
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})