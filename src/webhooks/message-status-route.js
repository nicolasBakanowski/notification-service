
const express = require('express');
const createLog = require('../webhooks/message-status-helpers.js')
require('dotenv').config()

const router = express.Router();

router.route('/message-status')
	.post((req,res,next)=>{
        const status = { ...req.body }
        if (status.MessageStatus == 'failed') {
            createLog(process.env.FILE_ERROR_SENT,status)
            return res.status(200).send({ok:'ok'})
            
        }else if (status.MessageStatus != 'delivered') {
            createLog(process.env.FILE_DELIVERED_SENT,status)
            return res.status(200).send({ok:'ok'})

        }
         else {
           return res.status(404)
        
    }})

module.exports = router;