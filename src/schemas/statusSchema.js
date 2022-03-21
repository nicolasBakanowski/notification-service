const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const StatusSchema = Joi.object()
  .keys({
    MessageSid: Joi.string(),
    MessageStatus: Joi.required().valid('failed', 'delivered', 'undelivered')
  })
  .unknown()

module.exports = StatusSchema