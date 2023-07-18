const path = require('path');
const express = require('express');
const { Users, Messages, Void } = require('./database/index');
require('dotenv').config();

const port = 4000;

const distPath = path.resolve(__dirname, '..', 'dist');


console.log(distPath);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
app.use('/decisionmaker', dmakerRouter);

// fill out routes


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
