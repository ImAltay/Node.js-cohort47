import express from 'express';
import {
  isValidUser,
  getDB,
  updateDB,
  hashPassword,
  generateID,
  comparePassword,
} from './users.js';
import fs from 'fs';

let app = express();

app.use(express.json());
// Create routes here, e.g. app.post("/register", .......)

app.post('/register', async (req, res) => {
  const newUser = {
    id: generateID(),
    username: req.body.username,
    password: await hashPassword(req.body.password),
  };
  if (!isValidUser(newUser).isValid) {
    isValidUser(newUser, res).result();
  }

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
    return res.status(200).send('Successful login').end();
  } else {
    return res.status(401).send('WRONG PASSWORD').end();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
