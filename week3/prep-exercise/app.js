import express from 'express';
import {
  isValidUser,
  getDB,
  updateDB,
  hashPassword,
  generateID,
  comparePassword,
  generateJWT,
  verifyJWT,
} from './users.js';
import fs from 'fs';

let app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  const newUser = {
    id: generateID(),
    username: req.body.username,
    password: req.body.password,
  };
  if (!isValidUser(newUser).isValid) {
    isValidUser(newUser, res).result();
  }
  newUser.password = await hashPassword(req.body.password);
  const db = getDB();
  db.users.push(newUser);
  updateDB(db);

  res.status(201).send({ id: newUser.id, username: newUser.username }).end();
});

app.post('/login', async (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(401).send('user name or password cant be empty').end();
  }
  const db = getDB();
  const user = db.users.find((user) => user.username === req.body.username);

  if (!user) {
    return res.status(404).send('USER NOT FOUND').end();
  }
  if (await comparePassword(req.body.password, user.password)) {
    const userJWT = generateJWT(user);

    res.set('Authorization', userJWT);
    return res.status(200).send('Successful login').end();
  } else {
    return res.status(401).send('WRONG PASSWORD').end();
  }
});

app.get('/user', (req, res) => {
  const token = req.headers.authorization;
  const db = getDB();
  try {
    const user = db.users.find((user) => user.id === verifyJWT(token).id);
    if (user) {
      return res.status(200).send(user).end();
    }
  } catch (err) {
    return res.status(401).send('INVALID TOKEN').end();
  }
});

app.post('/logout', (req, res) => {
  // allow user to logout and invalidate? token
  res.set('Authorization', '');
  return res.status(204).send('Logged out').end();
  // client should invalidate token?
  // I don't think this should be enough in real life
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
