const express = require('express');
const { Users } = require('./database/index');
const wofRouter = express.Router();

// handle request to get top 5 users
wofRouter.get('/users', (req, res) => {
  // use sequelize method to get users
  Users.findAll()
    .then((usersArr) => {
      // sort the users array by points
      const sorted = usersArr.sort((a, b)=>{
        return b.points - a.points;
      });
      //send back a 200 SC and users first 5 indexes from sorted array
      res.status(200).send(sorted.slice(0, 5));
    })
    .catch((err) => {
      // if db query fails, send back 500 SC
      console.error('Failed to GET users: ', err);
      res.sendStatus(500);
    });

});

// handle request to update points
wofRouter.patch('/users/:id', (req, res) => {
  // access id from request parameters
  const { id } = req.params;
  // access points from request body
  const { points } = req.body;
  // use sequelize update method
  Users.update({ points: points }, { where: {id: id}})
    .then((updatedArr) => {
      // if id is found, [ 1 ] is sent back
      if (updatedArr[0] > 0) {
        // send back 200 SC
        res.sendStatus(200);
      } else {
        // if id is not found, [ 0 ] is sent back
        // send back 404 SC
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Failed to PATCH: ', err);
      res.sendStatus(500);
    });
});

module.exports = wofRouter;
