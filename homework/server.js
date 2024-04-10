import express from 'express';
import fetch from 'node-fetch';
import { KEYS } from './sources/keys.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${KEYS.API_KEY}`
  )
    .then((response) => {
      return res.json(response);
    })
    .catch((error) => {
      return res.send('Error: ' + error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
