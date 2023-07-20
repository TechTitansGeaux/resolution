const express = require('express');
const homeRouter = express.Router();
const { Void } = require("../database/index");


// VOID ROUTES
// GET retrieve all screams at '/void' from Void table
homeRouter.get('/void', (req, res) => {
// use sequelize model method to get all from voids table
  Void.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      // log error
      console.error('Error: Void.findAll() GET Error ==>', err);
      // send status 500
      res.sendStatus(500);
  })
})

// POST new screams at '/void' as text into Void table
homeRouter.post('/void', (req, res) => {
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

// PUT updates likes via '/void' to Void table
homeRouter.put('/void', (req, res) => {
  res.json({ msg: 'test in update in postman'})
})

module.exports = homeRouter;