const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'some message';
    const message = generateMessage(from, text);

    expect(Object.prototype.toString.call(message.createdAt) === '[object Date]').toBeTruthy();
    expect(message).toMatchObject({from,text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    const from = 'Geo';
    const latitude = '34.9062183';
    const longitude = '-56.1922948';
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(from, latitude, longitude);

    expect(Object.prototype.toString.call(message.createdAt) === '[object Date]').toBeTruthy();
    expect(message).toMatchObject({from, url});
  });
});