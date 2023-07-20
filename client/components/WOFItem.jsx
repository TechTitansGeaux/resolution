import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const WOFItem = ({user, refresher}) => {


  // create trophy variable in state for each user
  const [ trophy, setTrophy ] = useState('');
  // create placement variable in state for each user
  const [ placement, setPlacement ] = useState('');
  
  // useEffect(() => updateTrophy(user), [points]);

  // get placement of each user
  // useEffect to get user placement
  const getPlacement = async () => {
    // axios get request
    const request = await axios.get('/wofRoutes/users');
    setPlacement((request.data.map(user => user.id).indexOf(user.id)) / request.data.length);
  };
  useEffect(() => {
    getPlacement();
  }, []);
  // console.log(placement, '<----placements from wofItem');

  // assign trophy according to placement
  useEffect(() => {
    const chooseAward = () => {
      // determine if user has no points
      if (user.points === 0) {
        setTrophy('Earn points to win an award!');
        // else determine users placement
      } else if (placement <= .1) {
        // top 10 percent get gold
        setTrophy('🏆');
      } else if (placement <= .2) {
        // top 20 get Silver
        setTrophy('🥈');
      } else if (placement <= .3) {
        // top 30 get Bronze
        setTrophy('🥉');
      } else {
        // else if user has points but placement is over top 30 percent, ribbon
        setTrophy('🎗️');
      }
    };
    chooseAward();
    // should update every time placement updates
  }, [placement]);

  // send trophy back to database
  useEffect( () => {
    const sendTrophy = async () => {
      await axios.patch(`wofRoutes/users/${user.id}`, {
        trophy: trophy
      })
        .catch((err) => {
          console.error('Failed to axios patch trophy: ', err);
        });
    };
    sendTrophy();
  }, [trophy]);



  return (
    <li>{user.username} ......... {user.points} points! {user.trophy}</li>
  );
};

export default WOFItem;
