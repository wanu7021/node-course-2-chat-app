const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'some message';
    const message = generateMessage(from, text);

    expect(Object.prototype.toString.call(message.createdAt) === '[object Date]').toBeTruthy();
    expect(message).toMatchObject({from,text});
  });
});