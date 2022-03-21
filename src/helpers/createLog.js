const fs = require('fs')
const moment =require('moment')

const createLog = (status) => {
  const filename = status.MessageStatus != 'delivered' ? process.env.DELIVERED_FILENAME : process.env.UNDELIVERED_FILENAME
  return new Promise(( resolve, reject ) => {
    status.date = moment().format('YYYY-MM-DD HH:mm:ss Z')
    fs.appendFile(filename, JSON.stringify(status), function (err) {
      if (err) reject(err);
      resolve(status)
    });
  })
}

module.exports = createLog