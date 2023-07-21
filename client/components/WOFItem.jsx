import { useState, useEffect } from "react";
import axios from 'axios';

const WOFItem = ({user, conflictedUser, matchTrophy}) => {

  // create trophy variable in state for each user
  const [ trophy, setTrophy ] = useState('');
  // create placement variable in state for each user
  const [ placement, setPlacement ] = useState('');
  // points variable in state for each user
  const [ points, setPoints ] = useState('');

  console.log(conflictedUser, matchTrophy, '<----conflicted user and match trophy');

  // function to get points of each user
  // get current points from user
  const getPoints = async () => {
    // axios get request
    await axios.get(`/wofRoutes/users/${user.id}`)
      // grab points and assign to state
      .then(({data}) => {
        setPoints(data.points);
      })
      .catch((err) => {
        console.error('Failed axios GET user points: ', err);
      });
  };

  useEffect(() => {
    getPoints();
  }, []);
  // get placement of each user
  // useEffect to get user placement
  const getPlacement = async () => {
    // axios get request
    const request = await axios.get('/wofRoutes/users');
    setPlacement((request.data.map(user => user.id).indexOf(user.id)) / request.data.length);
  };
  useEffect(() => {
    getPlacement();
  }, [points]);

  // console.log(placement, '<----placements from wofItem');

  // assign trophy according to placement
  useEffect(() => {
    const chooseAward = (user) => {
      // first determine if user has same amount of points but different trophy than neighbor
      if (user === conflictedUser) {
        // if so, both get higher trophy
        setTrophy(matchTrophy);
        // then determine is user has no points
      } else if (points === 0) {
        setTrophy('Earn points to win an award!');
      } else if (placement <= .1) {
        // determine user placement
        // top 10 percent get gold
        setTrophy('🏆');
      } else if (placement <= .2) {
        // top 20 get Silver
        setTrophy('🥈');
      } else if (placement <= .35) {
        // top 30 get Bronze
        setTrophy('🥉');
      } else {
        // else if placement is over top 30 percent, ribbon
        setTrophy('🎗️');
      }
    };
    chooseAward(user);
    // should update every time placement updates
  }, [placement]);

  // send trophy back to database
  const sendTrophy = async () => {
    await axios.patch(`wofRoutes/users/${user.id}`, {
      trophy: trophy
    })
      .catch((err) => {
        console.error('Failed to axios patch trophy: ', err);
      });
  };

  // call send trophy to db and fix trophy
  useEffect(() => {
    sendTrophy();
  }, [trophy]);

  return (
    <li>{user.username} ......... {user.points} points! {trophy}</li>
  );
};

export default WOFItem;
