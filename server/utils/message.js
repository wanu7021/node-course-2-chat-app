const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment()
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`, 
    createdAt: moment()
  }
};

module.exports = {generateMessage, generateLocationMessage};