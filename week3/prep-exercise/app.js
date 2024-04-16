import express from 'express';
import { isValidUser, addDB } from './users.js';
import fs from 'fs';
// Use below import statement for importing middlewares from users.js for your routes
// import { ....... } from "./users.js";

let app = express();

app.use(express.json());
// Create routes here, e.g. app.post("/register", .......)

app.post('/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  isValidUser(newUser);
  addDB(newUser);
  res.status(201).send({ username: newUser.username }).end();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
