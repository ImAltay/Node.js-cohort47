// dumb database

export const userDB = [
  {
    username: 'userello1',
    password: '123456',
  },
  {
    username: 'user2',
    password: '123456789',
  },
];

export const addUser = (newUser) => {
  userDB.push(newUser);
};
