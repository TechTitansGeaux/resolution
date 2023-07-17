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

// fill out routes

// VOID ROUTES
// GET retrieve all screams at '/' from Void table
app.get('/void', (req, res) => {
// use sequelize model method to get all from voids table
  Void.findAll()
    .then((data) => {
      console.log('Data from Void.findAll()', data)
      res.status(200).send(data);
    })
    .catch((err) => {
      // log error
      console.error('Error: Void.findAll() GET Error ==>', err);
      // send status 500
      res.sendStatus(500);
  })
})

// POST new screams at '/' as text into Void table
app.post('/void', (req, res) => {
  // res.json({ msg: 'test in postman'}) // test in postman
  const { text } = req.body;
  Void.create({ text })
    .then((data) => {
      // log data
      console.log('Success in Void.create() POST ==> ', data)
      res.sendStatus(201);
    })
    .catch((err) => {
      // log the error
      console.error('Error in Void.create() POST Error ==> ', err);
      // send status to 500
      res.sendStatus(500);
  })
})


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
