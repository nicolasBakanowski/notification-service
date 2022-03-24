const Joi = require('joi');

const statusSchema = Joi.object()
  .keys({
    MessageSid: Joi.string(),
    MessageStatus: Joi.required().valid('failed', 'delivered', 'undelivered')
  })
  .unknown()

module.exports = statusSchema