require('dotenv').config()
const express = require('express');
const createLog = require('../helpers/createLog.js')
const httpStatus = require('http-status')
const router = express.Router();
const StatusSchema = require('../schemas/statusSchema')

// THIS ENDPOINT RECEIVES A REQUEST FROM TWILIO WEBHOOK WITH NOTIFICATION DELIVERY STATUS

router.route('/')
    .post( async ( req, res ) => {
        const status = StatusSchema.validate({ ...req.body })
        status.error && res.status( httpStatus.BAD_REQUEST ).send({ errorMessage: status.error })
        try {
   
            const log = await createLog(status)
            return res.status( httpStatus.CREATED ).send({ message: "Notification was succesfully logged.", log: log})
        } catch (err) {
            return res.status( httpStatus.INTERNAL_SERVER_ERROR ).send({message: "There was an error and the notification was not logged properly.", errorCode: err.code})
        }
    })

module.exports = router;