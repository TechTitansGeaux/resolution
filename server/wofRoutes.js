const express = require('express');
const { Users } = require('./database/index');
const wofRouter = express.Router();

// handle request to get top 50 users
wofRouter.get('/users', (req, res) => {
  // use sequelize method to get users
  Users.findAll()
    .then((usersArr) => {
      // sort the users array by points
      const sorted = usersArr.sort((a, b)=>{
        return b.points - a.points;
      });
      //send back a 200 SC and sorted array
      res.status(200).send(sorted);
    })
    .catch((err) => {
      // if db query fails, send back 500 SC
      console.error('Failed to GET users: ', err);
      res.sendStatus(500);
    });

});

// handle request to update properties (points or trophy)
wofRouter.patch('/users/:id', (req, res) => {
  // access id from request parameters
  const { id } = req.params;
  // use sequelize update method
  // pass in any properties from request body
  Users.update({... req.body}, { where: {id: id}})
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
