import fs from 'fs';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

// export const register = async (req, res) => {};

export const isValidUser = (newUser, res) => {
  if (!newUser.username) {
    return {
      isValid: false,
      result: () => {
        res.status(400).send('Username can not be empty').end();
      },
    };
  }
  if (!newUser.password) {
    return {
      isValid: false,
      result: () => {
        res.status(400).send('password can not be empty').end();
      },
    };
  }
  if (newUser.password.length < 6) {
    return {
      isValid: false,
      result: () => {
        res.status(400).send('password should be at least 6 char').end();
      },
    };
  }
  return { isValid: true };
  // you can add more checks but whatever
};

export const getDB = () => {
  // json to object from database.json
  return JSON.parse(fs.readFileSync('./database.json'));
};

export const updateDB = (newDB) => {
  // object to json to database.json
  fs.writeFileSync('./database.json', JSON.stringify(newDB));
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateID = () => {
  return v4();
};
