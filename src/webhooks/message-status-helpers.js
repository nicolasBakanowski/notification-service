const fs = require('fs')
const moment =require('moment')

const createLog = (txtfile,noSendMessage)=>{
    noSendMessage.date = moment().format('YYYY-MM-DD HH:mm:ss Z')
    fs.appendFile(txtfile, JSON.stringify(noSendMessage), function (err) {
        if (err) throw err;
        return console.log('The "data to append" was appended to file!');
      });
    
}
module.exports = createLog