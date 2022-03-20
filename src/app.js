const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const helmet = require('helmet');
//const sendWhatsApp = require("./integration/events/whatsapp-event/whatsapp-event");
const webhookRoute = require('./webhooks/message-status-route')
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
app.use(cors());
app.options('*', cors());
app.use('/webhook', webhookRoute);

app.get('/', (req, res, next) => {
    console.log('home')
    res.send('home')
    return next()
})

//sendWhatsApp()
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
    })
console.log('running')