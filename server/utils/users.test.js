const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Juan',
      room: 'Mingo'
    }, {
      id: '2',
      name: 'Pepe',
      room: 'Mingo'
    }, {
      id: '3',
      name: 'Toto',
      room: 'Tingo'
    }]
  });

  it('should remove a user', () => {
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userId = '99';
    const user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const userId = '2';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    const userId = '99';
    const user = users.getUser(userId);
    expect(user).toBeFalsy();
  });

  it('should add new user', () => {
    users = new Users();
    const user = {
      id: '123',
      name: 'test',
      room: 'test room'
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for Mingo room', () => {
    const userList = users.getUserList('Mingo');
    expect(userList).toEqual(['Juan', 'Pepe']);
  });

  it('should return names for Tingo room', () => {
    const userList = users.getUserList('Tingo');
    expect(userList).toEqual(['Toto']);
  });
});