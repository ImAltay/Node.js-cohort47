const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/blogs', function (req, res) {
  let { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end('ok');
});

app.put('/blogs/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    if (fs.existsSync(req.params.title)) {
      fs.unlinkSync(__dirname + `/${req.params.title}`);
      fs.writeFileSync(req.body.title, req.body.content);
      res.end('ok');
    } else {
      res.status(404).send('Error: no such blog exist');
    }
  } else {
    res.status(400).send('Error: Title and content are required');
  }
});

app.delete('/blogs/:title', (req, res) => {
  if (fs.existsSync(req.params.title)) {
    fs.unlinkSync(req.params.title);
    res.end('ok');
  } else {
    res.status(404).send('error: no such blog exist');
  }
});

app.get('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  // check if post exists
  if (fs.existsSync(req.params.title)) {
    const post = fs.readFileSync(req.params.title);
    res.send(post);
  } else {
    res.status(404).send('error: no such blog exist');
  }

  // send response
});

app.listen(3000);
