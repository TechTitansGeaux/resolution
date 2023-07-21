import WOFItem from "./WOFItem.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';

const WallOfFame = () => {

  // add top property to state, empty array initially
  const [ top, setTop ] = useState([]);
  // trophy state here to handle case where points are equal but trophies different
  const [ matchTrophy, setMatchTrophy ] = useState('');
  // user state here to hold users who have conflicting trophies but same points
  const [ conflictedUser, setConflictedUser ] = useState('');

  // useEffect hook to get top users and update state
  useEffect(() => {
    //axios get request
    axios.get('/wofRoutes/users')
      // destructure to get data (array of top) from response
      .then(({data}) => {
        // set top in state to top given from axios
        setTop(data.slice(0, 10));
      })
      .catch((err) => {
        console.error('Failed axios GET top 5: ', err);
      });
  }, []);

  // function to determine if two users have same points but different trophy
  const checkTrophy = () => {
    if (top) {
      // iterate through all users
      for (let i = 0; i < top.length; i++) {
        // determine if there is a NEXT user in array
        if (top[i + 1]) {
          // check if points are same
          if (top[i].points === top[i + 1].points) {
            // now check if trophies are NOT the same
            if (top[i].trophy !== top[i + 1].trophy) {
              console.log('found mismatch trophies');
              // set trophy on state to the FIRST users trophy
              setMatchTrophy(top[i].trophy);
              setConflictedUser(top[i + 1]);
            }
          }
        }
      }
    }
  };
  // call check trophy for conflicts once with useEffect
  useEffect(() => {
    checkTrophy();
  }, [top]);

  return (
    <div className='wof-component container'>
      <div className="wof-header-container">
        <div className='wof-users-component'>
          <h1 className="text-primary">Wall Of Fame</h1>
          {top.map((user, index) => {
            // send down each user, any conflicted user, and any match trophy
            return <WOFItem user={user} conflictedUser={conflictedUser} matchTrophy={matchTrophy} key={'user' + index}/>;
          })}
        </div>
        <div className='wof-leger-component'>
          <h5 className="text-primary">Leger</h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <th scope="row">🏆</th>
                <td>Most elite! Top 10%</td>
              </tr>
              <tr>
                <th scope="row">🥈</th>
                <td>Second most elite! Top 20%</td>
              </tr>
              <tr>
                <th scope="row">🥉</th>
                <td>Third most elite! Top 35%</td>
              </tr>
              <tr>
                <th scope="row">🎗️</th>
                <td>Earning points! Keep it up</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='wof-explain-points-component'>
        <h5 className="text-primary">How do I earn points?</h5>
        <p>
          Earn points by resolving your conflicts!
          Scream into the void for 5. Make a decision for 10.
           Create and send a meme for 15. And remember, conflict resolution is a practice!
           Stay active each week to keep your points up.
        </p>
      </div>
    </div>
  );
};

export default WallOfFame;
