import { userDB, addUser } from './database.js';

// export const register = async (req, res) => {};

export const isValidUser = (newUser) => {
  if (!newUser) {
    res.status(400).send('invalid user').end();
    return;
  }
  if (newUser.password < 6) {
    res.status(400).send('password should be at least 6 char').end();
    return;
  }

  // you can add more checks but whatever
};

export const addDB = (newUser) => {
  addUser(newUser);
};
