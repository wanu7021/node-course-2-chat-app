const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date()
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`, 
    createdAt: new Date()
  }
};

module.exports = {generateMessage, generateLocationMessage};