import { useState, useEffect } from "react";
import axios from 'axios';

const WOFItem = (props) => {

  // create trophy variable in state for each user
  const [ trophy, setTrophy ] = useState('');
  // create placement variable in state for each user
  const [ placement, setPlacement ] = useState('')
  // get placement of each user
  // useEffect to get user placement
  useEffect(() => {
    // axios get request
    axios.get('/wofRoutes/users')
      .then(({data}) => {
        // in order to make placement relative to other users and to amount of users
        // set placement to users place in ranked list, divided by the length
        console.log((data.map(user => user.id).indexOf(props.user.id)), '<---rankings from wofItem')
        console.log(props.user, '<---users from wofItem')
        setPlacement((data.map(user => user.id).indexOf(props.user.id)) / data.length);
      })
      .catch((err) => {
        console.error('Failed axios GET user placement: ', err);
      });

  }, []);
  console.log(placement, '<----placements from wofItem')

  // assign trophy according to placement
  useEffect(() => {
    // determine if user has no points
    if (props.user.points === 0) {
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
    // should update every time placement updates
  }, [placement]);

  // send trophy back to database
  useEffect( () => {
    axios.patch(`wofRoutes/users/${props.user.id}`, {
      trophy: trophy
    })
      .catch((err) => {
        console.error('Failed to axios patch trophy: ', err);
      });
  }, [trophy]);

  return (
    <li>{props.user.username} ......... {props.user.points} points! {props.user.trophy}</li>
  );
};

export default WOFItem;
