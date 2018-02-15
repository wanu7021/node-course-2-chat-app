const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString()', () => {
  it('should reject non-string values', () => {
    const foo = 123;
    expect(isRealString(foo)).toBe(false)
  });

  it('should reject string with only spaces', () => {
    const foo = '    ';
    expect(isRealString(foo)).toBe(false)
  });

  it('should allow string with non-space characters', () => {
    const foo = '   test   ';
    expect(isRealString(foo)).toBe(true)
  });
});