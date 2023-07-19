import WOFItem from "./WOFItem.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';

const WallOfFame = (props) => {

  // add top 5 property to state, empty array initially
  const [ top5, setTop5 ] = useState([]);

  // useEffect hook to get top 5 users and update state
  useEffect(() => {
    //axios get request
    axios.get('/wofRoutes/users')
      // destructure to get data (array of top 5) from response
      .then(({data}) => {
        // set top5 in state to top5 given from axios
        setTop5(data.slice(0, 6));
      })
      .catch((err) => {
        console.error('Failed axios GET top 5: ', err);
      });
  }, []);


  // this will go in PROF component
  // add trophy property to state
  const [ trophy, setTrophy ] = useState('');
  // add placement property to state to hold relative placement
  const [ placement, setPlacement ] = useState('');

  const testUser = {id: 6, username: 'Joe', points: 0};

  // useEffect to get user placement
  useEffect(() => {
    // axios get request
    axios.get('/wofRoutes/users')
      .then(({data}) => {
        // in order to make placement relative to other users and to amount of users
        // set placement to users place in ranked list, divided by the length
        setPlacement((data.map(user => user.id).indexOf(props.user.id)) / data.length);
      })
      .catch((err) => {
        console.error('Failed axios GET user placement: ', err);
      });
  }, []);

  // assign trophy according to placement
  useEffect(() => {
    // determine if user has no points
    if (testUser.points === 0) {
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
    axios.patch(`wofRoutes/users/${testUser.id}`, {
      trophy: trophy
    })
      .catch((err) => {
        console.error('Failed to axios patch trophy: ', err);
      });
  }, [trophy]);

  return (
    <div className='section container'>
      <h2>Wall Of Fame</h2>
      {top5.map((user, index) => {
        return <WOFItem user={user} key={'user' + index}/>;
      })}
    </div>
  );
};

export default WallOfFame;
