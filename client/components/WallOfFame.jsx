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

  return (
    <div className='wof-component container'>
      <div className='wof-users-component'>
        <h2 className="text-primary">Wall Of Fame</h2>
        {top5.map((user, index) => {
          return <WOFItem user={user} key={'user' + index}/>;
        })}
      </div>
      <div className='wof-leger-component'>
        <h2 className="text-primary">Leger</h2>
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th scope="row">🏆</th>
              <td>Most elite! Top 10%</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">🥈</th>
              <td>Second most elite! Top 20%</td>
            </tr>
            <tr>
              <th scope="row">🥉</th>
              <td>Third most elite! Top 30%</td>
            </tr>
            <tr>
              <th scope="row">🎗️</th>
              <td colspan="2">Earning points! Keep it up</td>
            </tr>
          </tbody>
        </table>
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
